import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Database connection logic here   
    await mongoose.connect(process.env.MONGO_URI)
    
    console.log("MongoDB connected successfully");
  }
  catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}