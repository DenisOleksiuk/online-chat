const io = require("socket.io")(3000, {
  cors: {
    origin: "*"
  }
});

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    // console.log(socket.id);
    console.log(socket.id);
    users[socket.id] = name || 'user';
    console.log(users[socket.id]);
    console.log(users);
    console.log();
    socket.broadcast.emit('user-connected', name)
    socket.broadcast.emit('user-disconnected', name)
  });
  socket.on('send-chat-message', message => {
    console.log(message);
    socket.broadcast.emit('chat-message', {name: users[socket.id], message})
  })
})