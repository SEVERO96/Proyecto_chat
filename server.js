const path = require('path');
const http = require ('http');
const express = require('express');
const socketio = require ('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket =>{

    //Mensaje solo al usuario que se conecta
    socket.emit('message','Welcome to chat');
    
    //Mensaje a todos los clientes o usuario, excepto el que se esta conectando en el momento
    socket.broadcast.emit('message', 'Un usuario se ha conectado al chat');


    socket.on('chatMessage', msg =>{
        console.log(msg);
        
        //Meensaje a todos los usuarios conectados en el socket
        io.emit('message', msg);
    });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
