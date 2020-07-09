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
});
io.on("disconnect",()=>{
    console.log("User Was Disconnected");
})

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});