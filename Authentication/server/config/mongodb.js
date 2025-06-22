import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("✅ Database Connected"));
    mongoose.connection.on('error', (err) => console.error("❌ DB Connection Error:", err));

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
