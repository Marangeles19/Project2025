import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const connectDB = async () => {
  try {
    // Conectarse a la base de datos de MongoDB (sin especificar el nombre de la base de datos aquí)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Crear un índice único en la colección "members" dentro de la base de datos "mern_auth"
    const db = mongoose.connection.db;
    await db.collection('mern_auth').createIndex({ name: 1 }, { unique: true });

    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);  // Termina el proceso si hay error
  }
};

export default connectDB;