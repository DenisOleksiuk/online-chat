const express = require('express');
const io = require("socket.io")(process.env.PORT || 3000, {
  cors: {
    origin: "*"
  }
});

const app = express();

app.use(express.static(__dirname + "/public"));

app.listen(3001);

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