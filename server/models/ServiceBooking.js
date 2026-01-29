import mongoose from 'mongoose';

const serviceBookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    required: true
  },
  serviceTypeId: String,
  serviceCenter: {
    type: String,
    required: true
  },
  serviceCenterId: String,
  carModel: {
    type: String,
    required: true
  },
  carYear: String,
  registrationNumber: {
    type: String,
    required: true
  },
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
  preferredDate: {
    type: String,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  problemDescription: String,
  photos: [String],
  status: {
    type: String,
    enum: ['scheduled', 'vehicle-received', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  estimatedCost: Number,
  actualCost: Number,
  completedAt: Date,
  notes: String
}, {
  timestamps: true
});

const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema);

export default ServiceBooking;
