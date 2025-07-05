import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; // Asegúrate del nombre del archivo
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import morgan from 'morgan';
import cors from "cors";

const app = express();
const port = 6005;

connectDB();

const corsOptions = {
  origin: "http://54.147.184.127", // Permitir peticiones solo desde el frontend
  credentials: true, // **IMPORTANTE** Permitir envío de cookies
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cookieParser()); // Mueve esto antes de cors()
app.use(express.json()); 
app.use(cors(corsOptions)); // cors después de cookieParser()
app.use(morgan('dev'));

// Middleware para depuración (deberías eliminar esto en producción)
app.use((req, res, next) => {
  console.log("Cookies recibidas:", req.cookies); 
  next();
});

// API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
