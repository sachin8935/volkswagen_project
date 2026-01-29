import express from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Order from '../models/Order.js';

const router = express.Router();

// Initialize Stripe (use test key)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// In-memory orders storage (fallback)
const ordersMap = new Map();

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr', metadata = {} } = req.body;
    
    // For demo without actual Stripe key
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      const mockIntent = {
        id: `pi_mock_${uuidv4()}`,
        client_secret: `pi_mock_${uuidv4()}_secret_mock`,
        amount,
        currency,
        status: 'requires_payment_method'
      };
      return res.json({ success: true, data: mockIntent });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in paise
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true
      }
    });
    
    res.json({
      success: true,
      data: {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      }
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Confirm payment (for demo purposes)
router.post('/confirm', async (req, res) => {
  try {
    const { paymentIntentId, orderDetails } = req.body;
    
    // Create order
    const orderId = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    const order = new Order({
      orderId,
      items: orderDetails.items || [],
      customerInfo: {
        name: orderDetails.customer?.name || 'Customer',
        email: orderDetails.customer?.email || '',
        phone: orderDetails.customer?.phone || '',
        address: orderDetails.shippingAddress || {}
      },
      pricing: {
        subtotal: orderDetails.totals?.subtotal || 0,
        discount: orderDetails.totals?.discount || 0,
        gst: orderDetails.totals?.gst || 0,
        total: orderDetails.totals?.total || 0
      },
      paymentInfo: {
        method: 'card',
        status: 'completed',
        transactionId: paymentIntentId,
        paidAt: new Date()
      },
      orderStatus: 'confirmed',
      statusHistory: [
        { status: 'confirmed', timestamp: new Date(), note: 'Order confirmed after payment' }
      ]
    });
    
    await order.save();
    
    res.json({
      success: true,
      data: {
        orderId,
        status: 'completed',
        message: 'Payment successful! Your order has been confirmed.'
      }
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create order - saves to MongoDB
router.post('/order', async (req, res) => {
  try {
    const {
      items,
      totals,
      customer,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentId
    } = req.body;
    
    const orderId = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    const order = new Order({
      orderId,
      items: items || [],
      customerInfo: {
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        address: shippingAddress || {}
      },
      pricing: {
        subtotal: totals?.subtotal || 0,
        discount: totals?.discount || 0,
        gst: totals?.gst || 0,
        total: totals?.total || 0
      },
      paymentInfo: {
        method: paymentMethod || 'cod',
        status: 'completed',
        transactionId: paymentId || null,
        paidAt: new Date()
      },
      orderStatus: 'confirmed',
      statusHistory: [
        { status: 'confirmed', timestamp: new Date(), note: 'Order placed successfully' }
      ]
    });
    
    await order.save();
    
    res.json({
      success: true,
      data: {
        orderId: order.orderId,
        orderStatus: order.orderStatus,
        items: order.items,
        pricing: order.pricing,
        customerInfo: order.customerInfo
      },
      message: `Order placed successfully! Order ID: ${orderId}`
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
});

// Get order
router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order', error: error.message });
  }
});

// Generate invoice PDF
router.get('/invoice/:orderId', async (req, res) => {
  const order = orders.get(req.params.orderId);
  
  if (!order) {
    // Generate mock invoice for demo
    const mockOrder = {
      orderId: req.params.orderId,
      items: [
        { name: 'OE Oil Filter', quantity: 2, price: 650 },
        { name: 'Air Filter Element', quantity: 1, price: 1200 }
      ],
      totals: { subtotal: 2500, discount: 250, gst: 405, total: 2655 },
      customer: { name: 'Demo Customer', email: 'demo@example.com', phone: '+91 9876543210' },
      shippingAddress: { street: '123 Demo Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
      createdAt: new Date().toISOString()
    };
    return generateInvoicePDF(res, mockOrder);
  }
  
  generateInvoicePDF(res, order);
});

function generateInvoicePDF(res, order) {
  const doc = new PDFDocument({ margin: 50 });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.orderId}.pdf`);
  
  doc.pipe(res);
  
  // Header
  doc.fontSize(24).font('Helvetica-Bold').text('VOLKSWAGEN', 50, 50);
  doc.fontSize(10).font('Helvetica').text('Das Auto.', 50, 78);
  
  // Invoice Title
  doc.fontSize(20).font('Helvetica-Bold').text('TAX INVOICE', 400, 50, { align: 'right' });
  
  // Invoice Details
  doc.fontSize(10).font('Helvetica');
  doc.text(`Invoice No: ${order.orderId}`, 400, 80, { align: 'right' });
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, 400, 95, { align: 'right' });
  
  // Horizontal Line
  doc.moveTo(50, 120).lineTo(550, 120).stroke();
  
  // Bill To
  doc.fontSize(12).font('Helvetica-Bold').text('Bill To:', 50, 140);
  doc.fontSize(10).font('Helvetica');
  doc.text(order.customer?.name || 'Customer', 50, 158);
  doc.text(order.customer?.email || '', 50, 173);
  doc.text(order.customer?.phone || '', 50, 188);
  
  // Ship To
  if (order.shippingAddress) {
    doc.fontSize(12).font('Helvetica-Bold').text('Ship To:', 300, 140);
    doc.fontSize(10).font('Helvetica');
    doc.text(order.shippingAddress.street || '', 300, 158);
    doc.text(`${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''}`, 300, 173);
    doc.text(order.shippingAddress.pincode || '', 300, 188);
  }
  
  // Items Table Header
  const tableTop = 230;
  doc.moveTo(50, tableTop).lineTo(550, tableTop).stroke();
  
  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('Item', 50, tableTop + 10);
  doc.text('Qty', 350, tableTop + 10, { width: 50, align: 'center' });
  doc.text('Price', 410, tableTop + 10, { width: 60, align: 'right' });
  doc.text('Total', 480, tableTop + 10, { width: 70, align: 'right' });
  
  doc.moveTo(50, tableTop + 28).lineTo(550, tableTop + 28).stroke();
  
  // Items
  let yPosition = tableTop + 40;
  doc.font('Helvetica');
  
  order.items.forEach((item) => {
    const itemTotal = (item.price * item.quantity);
    doc.text(item.name, 50, yPosition, { width: 280 });
    doc.text(item.quantity.toString(), 350, yPosition, { width: 50, align: 'center' });
    doc.text(`₹${item.price.toLocaleString()}`, 410, yPosition, { width: 60, align: 'right' });
    doc.text(`₹${itemTotal.toLocaleString()}`, 480, yPosition, { width: 70, align: 'right' });
    yPosition += 25;
  });
  
  // Totals
  yPosition += 20;
  doc.moveTo(350, yPosition).lineTo(550, yPosition).stroke();
  yPosition += 15;
  
  doc.text('Subtotal:', 350, yPosition);
  doc.text(`₹${order.totals.subtotal.toLocaleString()}`, 480, yPosition, { width: 70, align: 'right' });
  yPosition += 20;
  
  if (order.totals.discount > 0) {
    doc.text('Discount:', 350, yPosition);
    doc.text(`-₹${order.totals.discount.toLocaleString()}`, 480, yPosition, { width: 70, align: 'right' });
    yPosition += 20;
  }
  
  doc.text('GST (18%):', 350, yPosition);
  doc.text(`₹${order.totals.gst.toLocaleString()}`, 480, yPosition, { width: 70, align: 'right' });
  yPosition += 20;
  
  doc.moveTo(350, yPosition).lineTo(550, yPosition).stroke();
  yPosition += 10;
  
  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('Total:', 350, yPosition);
  doc.text(`₹${order.totals.total.toLocaleString()}`, 480, yPosition, { width: 70, align: 'right' });
  
  // Footer
  doc.fontSize(8).font('Helvetica');
  doc.text('Thank you for choosing Volkswagen!', 50, 700, { align: 'center' });
  doc.text('This is a computer-generated invoice and does not require a signature.', 50, 715, { align: 'center' });
  doc.text('Volkswagen India Pvt. Ltd. | GSTIN: 27AAAAA0000A1Z5 | www.volkswagen.co.in', 50, 730, { align: 'center' });
  
  doc.end();
}

// Get Stripe publishable key
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
      testMode: true
    }
  });
});

export default router;
