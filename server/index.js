const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//INITIALISES SERVER SO THAT WE CAN USE SOCKET.IO
const io = socketio(server);
//THERE YOU GO

app.use(cors());

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user: 'admin', text: `Hi ${user.name}! You have joined room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined, everyone say hi!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('redirect', '/');
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the chat`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        }
    })
})
app.use(router);


server.listen(PORT, ()=> {
    console.log(`Server has started on PORT ${PORT}`);
})