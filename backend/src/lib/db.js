import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://ddxpatel2002:dhairya1110@cluster0.414pu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};