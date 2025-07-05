import express from "express";
import 'dotenv/config';
import connectDB from "./config/mongodb.js"; 
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 6001;

connectDB();

// 🎯 Configuración de CORS
const corsOptions = {
  origin: "http://54.147.184.127",
  credentials: true, // 🔥 Permitir cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cookieParser()); // 🍪 Primero: Parsear cookies
app.use(cors(corsOptions)); // 🔥 Luego, CORS
app.use(express.json()); // 📦 Manejo de JSON
app.use(morgan(':method :url :status - :response-time ms')); // 📜 Logs HTTP detallados

// 🔍 Middleware para ver cookies en consola
app.use((req, res, next) => {
  console.log("🍪 Cookies recibidas:", req.cookies);
  next();
});

// 🌍 Rutas principales
app.get('/', (req, res) => res.send("✅ API working"));
app.use('/api/auth', authRouter);

// 🚫 Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ success: false, message: '❌ Ruta no encontrada' });
});

// 🚀 Iniciar el servidor
app.listen(port, () => console.log(`🔥 Server started on PORT: ${port}`));
