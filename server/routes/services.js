import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { serviceTypes, serviceCenters } from '../data/database.js';
import ServiceBooking from '../models/ServiceBooking.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `service-${Date.now()}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// In-memory service bookings storage (fallback)
const serviceBookingsMap = new Map();

// Get service types
router.get('/types', (req, res) => {
  res.json({ success: true, data: serviceTypes });
});

// Get service centers
router.get('/centers', (req, res) => {
  const { city } = req.query;
  let centers = serviceCenters;
  
  if (city) {
    centers = serviceCenters.filter(c => c.city.toLowerCase() === city.toLowerCase());
  }
  
  res.json({ success: true, data: centers });
});

// Get cities with service centers
router.get('/cities', (req, res) => {
  const cities = [...new Set(serviceCenters.map(c => c.city))];
  res.json({ success: true, data: cities });
});

// Estimate service cost
router.post('/estimate', (req, res) => {
  const { serviceTypeId, carModel, carYear, additionalServices = [] } = req.body;
  
  const serviceType = serviceTypes.find(s => s.id === serviceTypeId);
  
  if (!serviceType) {
    return res.status(404).json({ success: false, message: 'Service type not found' });
  }
  
  // Base price calculation with car model adjustments
  let basePrice = serviceType.basePrice;
  
  // Premium car surcharge
  if (carModel === 'Tiguan') {
    basePrice = Math.round(basePrice * 1.5);
  } else if (carModel === 'Taigun' || carModel === 'Virtus') {
    basePrice = Math.round(basePrice * 1.2);
  }
  
  // Age adjustment
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - parseInt(carYear);
  if (carAge > 5) {
    basePrice = Math.round(basePrice * 1.1);
  }
  
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;
  
  res.json({
    success: true,
    data: {
      serviceType: serviceType.name,
      carModel,
      carYear,
      basePrice,
      gst,
      total,
      estimatedTime: serviceType.estimatedTime,
      includes: serviceType.includes,
      disclaimer: 'This is an estimated cost. Actual cost may vary based on inspection.'
    }
  });
});

// Book service appointment - saves to MongoDB
router.post('/book', upload.array('photos', 5), async (req, res) => {
  try {
    const {
      serviceTypeId,
      serviceCenterId,
      carModel,
      carYear,
      registrationNumber,
      customerName,
      customerEmail,
      customerPhone,
      preferredDate,
      preferredTime,
      problemDescription
    } = req.body;
    
    const serviceType = serviceTypes.find(s => s.id === serviceTypeId);
    const serviceCenter = serviceCenters.find(c => c.id === serviceCenterId);
    
    if (!serviceType || !serviceCenter) {
      return res.status(400).json({ success: false, message: 'Invalid service type or center' });
    }
    
    const bookingId = `SVC-${uuidv4().slice(0, 8).toUpperCase()}`;
    const photos = req.files ? req.files.map(f => f.filename) : [];
    
    const booking = new ServiceBooking({
      bookingId,
      serviceType: serviceType.name,
      serviceTypeId,
      serviceCenter: serviceCenter.name,
      serviceCenterId,
      carModel,
      carYear,
      registrationNumber,
      customerName,
      customerEmail,
      customerPhone,
      preferredDate,
      preferredTime,
      problemDescription,
      photos,
      status: 'scheduled',
      statusHistory: [
        { status: 'scheduled', timestamp: new Date(), note: 'Service appointment booked' }
      ],
      estimatedCost: serviceType.basePrice
    });
    
    await booking.save();
    
    res.json({
      success: true,
      data: {
        bookingId: booking.bookingId,
        serviceType: booking.serviceType,
        serviceCenter: booking.serviceCenter,
        carModel: booking.carModel,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: booking.status,
        estimatedCost: booking.estimatedCost,
        message: `Your service appointment has been booked successfully. Booking ID: ${bookingId}`
      }
    });
  } catch (error) {
    console.error('Service booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to book service', error: error.message });
  }
});

// Get booking status
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const booking = await ServiceBooking.findOne({ bookingId: req.params.bookingId });
    
    if (!booking) {
      // Return mock data for demo
      return res.json({
        success: true,
        data: {
          bookingId: req.params.bookingId,
          serviceType: 'General Service',
          serviceCenter: 'Volkswagen Mumbai Central',
          carModel: 'Polo',
          registrationNumber: 'MH01AB1234',
          status: 'in-progress',
          statusHistory: [
            { status: 'scheduled', timestamp: '2025-01-20T10:00:00Z', note: 'Service appointment booked' },
            { status: 'vehicle-received', timestamp: '2025-01-23T09:00:00Z', note: 'Vehicle received at service center' },
            { status: 'in-progress', timestamp: '2025-01-23T09:30:00Z', note: 'Service work started' }
          ],
          estimatedCompletion: '2025-01-23T14:00:00Z'
        }
      });
    }
    
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch booking', error: error.message });
  }
});

// Update booking status (for admin purposes)
router.patch('/booking/:bookingId/status', async (req, res) => {
  try {
    const { status, note } = req.body;
    const booking = await ServiceBooking.findOne({ bookingId: req.params.bookingId });
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    booking.status = status;
    booking.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || `Status updated to ${status}`
    });
    
    if (status === 'completed') {
      booking.completedAt = new Date();
    }
    
    await booking.save();
    
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update booking', error: error.message });
  }
});

// Get service history for a vehicle
router.get('/history/:registrationNumber', async (req, res) => {
  try {
    const regNum = req.params.registrationNumber.toUpperCase();
    const history = await ServiceBooking.find({ 
      registrationNumber: { $regex: new RegExp(regNum, 'i') } 
    }).sort({ createdAt: -1 });
    
    // Add mock history for demo if no records
    if (history.length === 0) {
      return res.json({
        success: true,
        data: [
          {
            bookingId: 'SVC-DEMO001',
            serviceType: 'General Service',
            date: '2024-10-15',
            serviceCenter: 'Volkswagen Mumbai Central',
            status: 'completed',
            cost: 6499,
            odometer: 15000
          },
          {
            bookingId: 'SVC-DEMO002',
            serviceType: 'AC Service',
            date: '2024-07-20',
            serviceCenter: 'Volkswagen Mumbai Central',
            status: 'completed',
            cost: 3299,
            odometer: 12000
          },
          {
            bookingId: 'SVC-DEMO003',
            serviceType: 'Major Service',
            date: '2024-04-10',
            serviceCenter: 'Volkswagen Mumbai Central',
            status: 'completed',
            cost: 14999,
            odometer: 10000
          }
        ]
      });
    }
    
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch history', error: error.message });
  }
});

export default router;
