let socket = io();
socket.on("connect",()=>{
    console.log("Connected To The Server");
});

socket.on('newMessage',(msg)=>{
    console.log(`New Message: ${msg}`);
});

socket.on("disconnect",()=>{
    console.log("Disconnected From The Server");
});