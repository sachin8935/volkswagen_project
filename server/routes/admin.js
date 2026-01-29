import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import TestDrive from '../models/TestDrive.js';
import ServiceBooking from '../models/ServiceBooking.js';
import Order from '../models/Order.js';
import CarReservation from '../models/CarReservation.js';
import Admin from '../models/Admin.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'volkswagen-admin-secret-key-2024';

// ============ ADMIN AUTHENTICATION ============

// Initialize default admin (run once)
const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'admin',
        password: 'admin@123',
        name: 'VW Admin',
        role: 'superadmin'
      });
      await admin.save();
      console.log('✅ Default admin created: username=admin, password=admin@123');
    }
  } catch (error) {
    console.error('Admin initialization error:', error);
  }
};
initializeAdmin();

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid or inactive admin' });
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }
    
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    if (!admin.isActive) {
      return res.status(401).json({ success: false, message: 'Account is disabled' });
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    // Generate token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          name: admin.name,
          role: admin.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Verify token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: {
      admin: {
        id: req.admin._id,
        username: req.admin.username,
        name: req.admin.name,
        role: req.admin.role
      }
    }
  });
});

// ============ DASHBOARD OVERVIEW ============

// Get dashboard statistics (protected)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const [
      testDriveCount,
      serviceBookingCount,
      orderCount,
      reservationCount,
      recentTestDrives,
      recentServiceBookings,
      recentOrders
    ] = await Promise.all([
      TestDrive.countDocuments(),
      ServiceBooking.countDocuments(),
      Order.countDocuments(),
      CarReservation.countDocuments(),
      TestDrive.find().sort({ createdAt: -1 }).limit(5),
      ServiceBooking.find().sort({ createdAt: -1 }).limit(5),
      Order.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Calculate revenue
    const orders = await Order.find({ 'paymentInfo.status': 'completed' });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0);

    res.json({
      success: true,
      data: {
        stats: {
          testDrives: testDriveCount,
          serviceBookings: serviceBookingCount,
          partsOrders: orderCount,
          carReservations: reservationCount,
          totalRevenue
        },
        recent: {
          testDrives: recentTestDrives,
          serviceBookings: recentServiceBookings,
          orders: recentOrders
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data', error: error.message });
  }
});

// ============ TEST DRIVES ============

// Get all test drive bookings
router.get('/test-drives', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const testDrives = await TestDrive.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await TestDrive.countDocuments(query);
    
    res.json({
      success: true,
      data: testDrives,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch test drives', error: error.message });
  }
});

// Update test drive status
router.patch('/test-drives/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const testDrive = await TestDrive.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    
    if (!testDrive) {
      return res.status(404).json({ success: false, message: 'Test drive not found' });
    }
    
    res.json({ success: true, data: testDrive });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update test drive', error: error.message });
  }
});

// Delete test drive
router.delete('/test-drives/:id', authMiddleware, async (req, res) => {
  try {
    const testDrive = await TestDrive.findByIdAndDelete(req.params.id);
    
    if (!testDrive) {
      return res.status(404).json({ success: false, message: 'Test drive not found' });
    }
    
    res.json({ success: true, message: 'Test drive deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete test drive', error: error.message });
  }
});

// ============ SERVICE BOOKINGS ============

// Get all service bookings
router.get('/service-bookings', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const serviceBookings = await ServiceBooking.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await ServiceBooking.countDocuments(query);
    
    res.json({
      success: true,
      data: serviceBookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch service bookings', error: error.message });
  }
});

// Update service booking status
router.patch('/service-bookings/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes, actualCost } = req.body;
    
    const booking = await ServiceBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Service booking not found' });
    }
    
    booking.status = status;
    if (notes) booking.notes = notes;
    if (actualCost) booking.actualCost = actualCost;
    
    booking.statusHistory.push({
      status,
      timestamp: new Date(),
      note: notes || `Status updated to ${status}`
    });
    
    if (status === 'completed') {
      booking.completedAt = new Date();
    }
    
    await booking.save();
    
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update service booking', error: error.message });
  }
});

// Delete service booking
router.delete('/service-bookings/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Service booking not found' });
    }
    
    res.json({ success: true, message: 'Service booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete service booking', error: error.message });
  }
});

// ============ PARTS ORDERS ============

// Get all orders
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { orderStatus: status } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Order.countDocuments(query);
    
    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
});

// Update order status
router.patch('/orders/:id', authMiddleware, async (req, res) => {
  try {
    const { orderStatus, trackingNumber, notes } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.orderStatus = orderStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (notes) order.notes = notes;
    
    order.statusHistory.push({
      status: orderStatus,
      timestamp: new Date(),
      note: notes || `Status updated to ${orderStatus}`
    });
    
    if (orderStatus === 'delivered') {
      order.deliveredAt = new Date();
    }
    
    await order.save();
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
  }
});

// Delete order
router.delete('/orders/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error: error.message });
  }
});

// ============ CAR RESERVATIONS ============

// Get all car reservations
router.get('/reservations', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { reservationStatus: status } : {};
    
    const reservations = await CarReservation.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await CarReservation.countDocuments(query);
    
    res.json({
      success: true,
      data: reservations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reservations', error: error.message });
  }
});

// Update reservation status
router.patch('/reservations/:id', authMiddleware, async (req, res) => {
  try {
    const { reservationStatus, paymentStatus, notes } = req.body;
    
    const reservation = await CarReservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    
    if (reservationStatus) reservation.reservationStatus = reservationStatus;
    if (paymentStatus) reservation.paymentStatus = paymentStatus;
    if (notes) reservation.notes = notes;
    
    await reservation.save();
    
    res.json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update reservation', error: error.message });
  }
});

// Delete reservation
router.delete('/reservations/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await CarReservation.findByIdAndDelete(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    
    res.json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete reservation', error: error.message });
  }
});

export default router;
