const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const publicPath =path.join(__dirname,"/../public");
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketio(server);

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("Connection Established");

    socket.emit('newMessage',{
        from:"Admin",
        text:"Welcome to the chat app",
        createdAt:new Date().getTime()
    });

    socket.broadcast.emit("newMessage",{
        from:"Admin",
        text:"A new user joined",
        createdAt:new Date().getTime()
    })

    socket.on('createMessage',(msg)=>{
        console.log(`Create Message: ${msg}`);
        io.emit('newMessage',{
            from:msg.from,
            text:msg.text,
            createdAt:new Date().getTime()
        });
    });
    
    socket.on("disconnect",()=>{
        console.log("User Was Disconnected");
    });

});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});