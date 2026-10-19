import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/oceanova';
  try {
    const conn = await mongoose.connect(connString, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Could not connect to MongoDB at ${connString}. Running in demo in-memory database mode.`);
  }
};
