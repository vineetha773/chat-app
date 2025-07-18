// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User connected');

  // Save username for each socket
  socket.on('set username', (username) => {
    socket.username = username;
    socket.broadcast.emit('chat message', `🔔 ${username} joined the chat`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${socket.username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('chat message', `❌ ${socket.username} left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
