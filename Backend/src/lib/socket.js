import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN],
  },
});

export function getReciverSocketId (userId) {
  return userSocketMap[userId];
}

// to store the socket id of online users
const userSocketMap = {}

io.on('connection', socket => {
  console.log('new connection', socket.id);
  
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit('user-socket-map', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('user-socket-map', Object.keys(userSocketMap));
  });
});

export { io, server, app };
