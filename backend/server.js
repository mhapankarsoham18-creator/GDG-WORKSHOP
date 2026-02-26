const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// PASTE YOUR NETLIFY URL HERE for FRONTEND_URL if not using .env
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://your-frontend-on-netlify.app';

app.use(cors({
  origin: FRONTEND_URL
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Backend Server is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
