const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//INITIALISES SERVER SO THAT WE CAN USE SOCKET.IO
const io = socketio(server);
//THERE YOU GO

io.on('connection', (socket) => {
    console.log('We have a new connection!');

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);

    })
    socket.on('disconnect', () => {
        console.log('Aw man they left...');
    })
})
app.use(cors());
app.use(router);

server.listen(PORT, ()=> {
    console.log(`Server has started on PORT ${PORT}\nVISIT AT http://localhost:5000/`);
})