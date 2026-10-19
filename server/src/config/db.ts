import mongoose from 'mongoose';

let connectionPromise: Promise<void> | null = null;

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;
  if (connectionPromise) return connectionPromise;

  const connString = process.env.MONGODB_URI
    || (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
      ? undefined
      : 'mongodb://127.0.0.1:27017/oceanova');

  if (!connString) {
    throw new Error('MONGODB_URI must be configured in production.');
  }

  connectionPromise = mongoose.connect(connString, {
      serverSelectionTimeoutMS: 5000,
    })
    .then((conn) => {
      console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    })
    .catch((error: unknown) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
};
