// Initialize express app and load environment variables
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import authMessages from './routes/message.routes.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Define the port number
const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);
app.use('/api/message', authMessages);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});