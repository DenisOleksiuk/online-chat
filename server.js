const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);


app.use(express.static(__dirname + "/public"));

http.listen(process.env.PORT);

const users = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name || 'user';
    socket.broadcast.emit('user-connected', name)
    socket.broadcast.emit('user-disconnected', name)
  });
  socket.on('send-chat-message', message => {
    console.log(message);
    socket.broadcast.emit('chat-message', {name: users[socket.id], message})
  })
});