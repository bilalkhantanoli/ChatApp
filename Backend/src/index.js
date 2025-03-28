// Initialize express app and load environment variables
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import authMessages from './routes/message.routes.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { io, server, app } from './lib/socket.js';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Define the port number
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use('/api/auth', authRoutes);
app.use('/api/message', authMessages);

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../Frontend', 'dist', 'index.html'));
  })
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});
