const express = require('express');
const cors = require('cors')


const app = express();
const server = require('http').createServer(app);
const { Server }= require('socket.io');

const socket = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
app.use(cors()); 

socket.on('connection', socket => {
    console.log('Client Connected:' + socket.id)


    socket.on('message', (msg) => {
         console.log(msg);
    });

    })





server.listen(3000);
