import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import TestDrive from '../models/TestDrive.js';
import CarReservation from '../models/CarReservation.js';

const router = express.Router();

// Book test drive - saves to MongoDB
router.post('/test-drive', async (req, res) => {
  try {
    const { carId, carName, carImage, name, email, phone, location, preferredDate, preferredTime } = req.body;
    
    const bookingId = `TD-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    const testDrive = new TestDrive({
      bookingId,
      carId,
      carName,
      carImage,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      location,
      preferredDate,
      preferredTime,
      status: 'confirmed'
    });
    
    await testDrive.save();
    
    res.json({
      success: true,
      data: {
        bookingId: testDrive.bookingId,
        carName: testDrive.carName,
        customerName: testDrive.customerName,
        location: testDrive.location,
        preferredDate: testDrive.preferredDate,
        preferredTime: testDrive.preferredTime,
        status: testDrive.status,
        message: `Your test drive for ${carName} has been booked for ${preferredDate} at ${preferredTime}. Our executive will contact you shortly.`
      }
    });
  } catch (error) {
    console.error('Test drive booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to book test drive', error: error.message });
  }
});

// Get test drive booking
router.get('/test-drive/:bookingId', async (req, res) => {
  try {
    const testDrive = await TestDrive.findOne({ bookingId: req.params.bookingId });
    
    if (!testDrive) {
      return res.status(404).json({ success: false, message: 'Test drive booking not found' });
    }
    
    res.json({ success: true, data: testDrive });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch test drive', error: error.message });
  }
});

// Create car reservation - saves to MongoDB
router.post('/reservation', async (req, res) => {
  try {
    const { 
      carId, 
      carName,
      carImage,
      variantId, 
      variantName, 
      colorId, 
      colorName, 
      totalPrice,
      tokenAmount,
      name, 
      email, 
      phone, 
      address,
      dealerLocation 
    } = req.body;
    
    const reservationId = `RES-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    const reservation = new CarReservation({
      reservationId,
      carId,
      carName,
      carImage,
      variantId,
      variantName,
      colorId,
      colorName,
      totalPrice,
      tokenAmount,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      dealerLocation,
      paymentStatus: 'pending',
      reservationStatus: 'pending',
      estimatedDelivery: '4-6 weeks'
    });
    
    await reservation.save();
    
    res.json({
      success: true,
      data: {
        reservationId: reservation.reservationId,
        carName: reservation.carName,
        variantName: reservation.variantName,
        colorName: reservation.colorName,
        totalPrice: reservation.totalPrice,
        tokenAmount: reservation.tokenAmount,
        reservationStatus: reservation.reservationStatus,
        estimatedDelivery: reservation.estimatedDelivery,
        message: `Your reservation for ${carName} ${variantName} has been initiated. Please complete the token payment of ₹${tokenAmount.toLocaleString()} to confirm.`
      }
    });
  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create reservation', error: error.message });
  }
});

// Get reservation
router.get('/reservation/:reservationId', async (req, res) => {
  try {
    const reservation = await CarReservation.findOne({ reservationId: req.params.reservationId });
    
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    
    res.json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reservation', error: error.message });
  }
});

// Update reservation after payment
router.patch('/reservation/:reservationId', async (req, res) => {
  try {
    const { paymentStatus, paymentId } = req.body;
    
    const reservation = await CarReservation.findOne({ reservationId: req.params.reservationId });
    
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    
    reservation.paymentStatus = paymentStatus;
    reservation.paymentId = paymentId;
    
    if (paymentStatus === 'completed') {
      reservation.reservationStatus = 'confirmed';
    }
    
    await reservation.save();
    
    res.json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update reservation', error: error.message });
  }
});

// Get all bookings for a user (by email)
router.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    
    const testDrives = await TestDrive.find({ customerEmail: { $regex: new RegExp(email, 'i') } });
    const reservations = await CarReservation.find({ customerEmail: { $regex: new RegExp(email, 'i') } });
    
    res.json({ 
      success: true, 
      data: {
        testDrives,
        reservations,
        services: []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user bookings', error: error.message });
  }
});

export default router;
