import express from 'express';
import Order from '../models/Order.js';
import TestDrive from '../models/TestDrive.js';
import ServiceBooking from '../models/ServiceBooking.js';
import CarReservation from '../models/CarReservation.js';

const router = express.Router();

// Get all orders/bookings by phone number
router.get('/by-phone/:phone', async (req, res) => {
  try {
    const phone = req.params.phone.replace(/\D/g, ''); // Remove non-digits
    
    // Create regex patterns for phone matching (handles different formats)
    const phonePatterns = [
      phone,
      phone.slice(-10), // Last 10 digits
      `+91${phone.slice(-10)}`,
      `91${phone.slice(-10)}`
    ];
    
    // Fetch all types of orders/bookings
    const [orders, testDrives, serviceBookings, carReservations] = await Promise.all([
      Order.find({ 
        $or: [
          { 'customerInfo.phone': { $in: phonePatterns } },
          { 'customerInfo.phone': { $regex: phone.slice(-10), $options: 'i' } }
        ]
      }).sort({ createdAt: -1 }),
      
      TestDrive.find({ 
        $or: [
          { customerPhone: { $in: phonePatterns } },
          { customerPhone: { $regex: phone.slice(-10), $options: 'i' } }
        ]
      }).sort({ createdAt: -1 }),
      
      ServiceBooking.find({ 
        $or: [
          { customerPhone: { $in: phonePatterns } },
          { customerPhone: { $regex: phone.slice(-10), $options: 'i' } }
        ]
      }).sort({ createdAt: -1 }),
      
      CarReservation.find({ 
        $or: [
          { customerPhone: { $in: phonePatterns } },
          { customerPhone: { $regex: phone.slice(-10), $options: 'i' } }
        ]
      }).sort({ createdAt: -1 })
    ]);

    // Format response
    const formattedOrders = orders.map(order => ({
      id: order.orderId,
      type: 'parts_order',
      typeLabel: 'Parts Order',
      status: order.status,
      date: order.createdAt,
      total: order.pricing?.total || 0,
      items: order.items?.map(item => item.name).join(', ') || 'N/A',
      itemCount: order.items?.length || 0,
      details: {
        customer: order.customerInfo?.name,
        email: order.customerInfo?.email,
        address: order.customerInfo?.address,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus
      }
    }));

    const formattedTestDrives = testDrives.map(td => ({
      id: td.bookingId,
      type: 'test_drive',
      typeLabel: 'Test Drive',
      status: td.status,
      date: td.createdAt,
      carName: td.carName,
      location: td.location,
      scheduledDate: td.preferredDate,
      scheduledTime: td.preferredTime,
      details: {
        customer: td.customerName,
        email: td.customerEmail,
        carId: td.carId
      }
    }));

    const formattedServiceBookings = serviceBookings.map(sb => ({
      id: sb.bookingId,
      type: 'service_booking',
      typeLabel: 'Service Booking',
      status: sb.status,
      date: sb.createdAt,
      serviceType: sb.serviceType,
      vehicleModel: sb.vehicleModel,
      vehicleNumber: sb.vehicleNumber,
      scheduledDate: sb.preferredDate,
      scheduledTime: sb.preferredTime,
      total: sb.estimatedCost || 0,
      serviceCenterName: sb.serviceCenterName,
      details: {
        customer: sb.customerName,
        email: sb.customerEmail,
        vehicleYear: sb.vehicleYear,
        additionalNotes: sb.additionalNotes
      }
    }));

    const formattedCarReservations = carReservations.map(cr => ({
      id: cr.reservationId,
      type: 'car_reservation',
      typeLabel: 'Car Reservation',
      status: cr.status,
      date: cr.createdAt,
      carName: cr.carName,
      variant: cr.variantName,
      color: cr.colorName,
      total: cr.totalPrice || 0,
      tokenAmount: cr.tokenAmount || 0,
      details: {
        customer: cr.customerName,
        email: cr.customerEmail,
        dealership: cr.dealership,
        paymentStatus: cr.paymentStatus
      }
    }));

    // Combine all and sort by date
    const allBookings = [
      ...formattedOrders,
      ...formattedTestDrives,
      ...formattedServiceBookings,
      ...formattedCarReservations
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      data: {
        total: allBookings.length,
        orders: formattedOrders,
        testDrives: formattedTestDrives,
        serviceBookings: formattedServiceBookings,
        carReservations: formattedCarReservations,
        all: allBookings
      }
    });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch tracking information',
      error: error.message 
    });
  }
});

// Get single order/booking details by ID
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Try to find in each collection
    let result = null;
    let type = null;

    // Check Orders
    result = await Order.findOne({ orderId });
    if (result) {
      type = 'parts_order';
    }

    // Check Test Drives
    if (!result) {
      result = await TestDrive.findOne({ bookingId: orderId });
      if (result) type = 'test_drive';
    }

    // Check Service Bookings
    if (!result) {
      result = await ServiceBooking.findOne({ bookingId: orderId });
      if (result) type = 'service_booking';
    }

    // Check Car Reservations
    if (!result) {
      result = await CarReservation.findOne({ reservationId: orderId });
      if (result) type = 'car_reservation';
    }

    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order/Booking not found' 
      });
    }

    res.json({
      success: true,
      data: {
        type,
        details: result
      }
    });
  } catch (error) {
    console.error('Order lookup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order details',
      error: error.message 
    });
  }
});

export default router;
