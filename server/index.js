import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

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

const app = express();

/* =========================
   ENV & CORE CONFIG
========================= */
const PORT = process.env.PORT || 5000;

/* =========================
   TRUST PROXY (IMPORTANT)
========================= */
app.set('trust proxy', true);

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, Postman
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        process.env.CLIENT_URL,
      ].filter(Boolean);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      // Safe fallback (tighten later)
      return callback(null, true);
    },
    credentials: true,
  })
);

/* =========================
   STATIC FILES
========================= */
app.use('/uploads', express.static('uploads'));

/* =========================
   HEALTH CHECK (NO DB DEPENDENCY)
========================= */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Volkswagen API',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/* =========================
   API ROUTES
========================= */
app.use('/api/cars', carsRouter);
app.use('/api/parts', partsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tracking', trackingRouter);
app.use('/api/ai', aiRouter);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

/* =========================
   SERVER LISTEN (CRITICAL FIX)
========================= */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚗 Volkswagen Server running on port ${PORT}`);
});
