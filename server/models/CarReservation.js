import mongoose from 'mongoose';

const carReservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    required: true,
    unique: true
  },
  carId: {
    type: String,
    required: true
  },
  carName: {
    type: String,
    required: true
  },
  carImage: String,
  variantId: String,
  variantName: String,
  colorId: String,
  colorName: String,
  totalPrice: Number,
  tokenAmount: Number,
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerAddress: String,
  dealerLocation: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  reservationStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  estimatedDelivery: String,
  notes: String
}, {
  timestamps: true
});

const CarReservation = mongoose.model('CarReservation', carReservationSchema);

export default CarReservation;
