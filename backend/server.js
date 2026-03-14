import dns from 'dns';

// CRITICAL: Force DNS resolution to use Google's DNS servers for SRV records before any other imports
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('EventHub API is running...');
});

// Database connection & Server Start
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase to 30s
      heartbeatFrequencyMS: 30000,   // Increase to 30s
      connectTimeoutMS: 30000,       // Add 30s connection timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    
    // Check if it looks like an IP whitelist issue
    if (error.message.includes('Could not connect to any servers') || error.message.includes('MongooseServerSelectionError')) {
      console.warn('IMPORTANT: This often means your IP address is not whitelisted in MongoDB Atlas.');
      console.warn('Please visit: https://www.mongodb.com/docs/atlas/security-whitelist/ to check your whitelist.');
    }
    
    console.log('Retrying in 10 seconds...');
    setTimeout(connectDB, 10000);
  }
};

connectDB();
