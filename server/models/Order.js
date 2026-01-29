import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemId: String,
  itemType: {
    type: String,
    enum: ['part', 'car', 'service']
  },
  name: String,
  price: Number,
  mrp: Number,
  quantity: Number,
  image: String,
  partNumber: String,
  variant: String,
  color: String
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [orderItemSchema],
  customerInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  pricing: {
    subtotal: Number,
    discount: Number,
    couponCode: String,
    gst: Number,
    deliveryCharge: Number,
    total: Number
  },
  paymentInfo: {
    method: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  trackingNumber: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  notes: String
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
