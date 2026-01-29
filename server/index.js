import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import carsRouter from './routes/cars.js';
import partsRouter from './routes/parts.js';
import servicesRouter from './routes/services.js';
import cartRouter from './routes/cart.js';
import paymentRouter from './routes/payment.js';
import bookingsRouter from './routes/bookings.js';
import adminRouter from './routes/admin.js';
import trackingRouter from './routes/tracking.js';
import aiRouter from './routes/ai.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175',
      process.env.CLIENT_URL,
      // Add your Render frontend URL patterns
    ].filter(Boolean);
    
    // Allow any Render or Vercel deployed frontend
    if (allowedOrigins.includes(origin) || 
        origin.endsWith('.onrender.com') || 
        origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(null, true); // Allow all origins for now (you can restrict later)
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/cars', carsRouter);
app.use('/api/parts', partsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tracking', trackingRouter);
app.use('/api/ai', aiRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Volkswagen API is running' });
});

app.listen(PORT, () => {
  console.log(`🚗 Volkswagen Server running on port ${PORT}`);
});
