import 'dotenv/config';
import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL as string;

export async function connectToDB() {
  try {
    console.log('Connecting to MongoDB at:', DB_URL);
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if unable to connect
  }
}
