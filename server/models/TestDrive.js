import mongoose from 'mongoose';

const testDriveSchema = new mongoose.Schema({
  bookingId: {
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
  location: {
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
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed'
  },
  notes: String
}, {
  timestamps: true
});

const TestDrive = mongoose.model('TestDrive', testDriveSchema);

export default TestDrive;
