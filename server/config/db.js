import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL;
    
    if (!mongoURI) {
      console.error('MongoDB URI not found in environment variables');
      console.log('Please add MONGO_URI to your .env file');
      return false;
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};

export default connectDB;
