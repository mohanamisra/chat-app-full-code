const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//INITIALISES SERVER SO THAT WE CAN USE SOCKET.IO
const io = socketio(server);
//THERE YOU GO

app.use(router);

server.listen(PORT, ()=> {
    console.log(`Server has started on PORT ${PORT}\nVISIT AT http://localhost:5000/`);
})