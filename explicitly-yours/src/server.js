const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let albumLikes = {
  "Graduation": 0,
  "Hardstone Psycho": 0,
  "IGOR": 0,
  "TWOPOINTFIVE": 0
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('like', (albumName) => {
    albumLikes[albumName] += 1;
    io.emit('updateLikes', { albumName, likes: albumLikes[albumName] });
  });

  socket.on('unlike', (albumName) => {
    albumLikes[albumName] -= 1;
    io.emit('updateLikes', { albumName, likes: albumLikes[albumName] });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));
