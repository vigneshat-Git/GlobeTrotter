import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test Route
app.get('/', (req, res) => {
  res.send('GlobeTrotter API is running...');
});

// Sample API Route
app.get('/api/destinations', async (req, res) => {
  try {
    // This is a sample route - you'll need to create the Destination model
    // const destinations = await Destination.find();
    // res.json(destinations);
    res.json([{ name: 'Sample Destination' }]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
