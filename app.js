import express from 'express';
import {APP_PORT } from './config';
import  io  from 'socket.io';
import dbConnect from './db';

import { chatModel } from './models/chat';

dbConnect();

const app  = express();
app.use(express.static('public'));

app.use(express.json());


// API CALLS

app.post('/api/chat', (req, res)=>{
    const chat = new chatModel({
        username: req.body.username,
        chatTxt: req.body.chatTxt 
    })
    chat.save().then(response=>{
        res.send(response)
    });
});









let server = app.listen(APP_PORT, ()=>{
    console.log(`Listenting on port ${APP_PORT}`);
});

let socketIo = io(server);

// console.log(socketIo);
socketIo.on('connection',(socket)=>{
    // console.log(`New Connection socket : ${socket.id}`);
    socket.on('chat', (data)=>{
        data.time = Date();
        socket.broadcast.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });   
})


