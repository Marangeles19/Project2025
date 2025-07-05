import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; 
import authRouter from "./routes/authRoutes.js";
import morgan from 'morgan';
import cors from "cors";

const app = express();
const port =  6002;

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
  console.log("🍪 Cookies recibidas:", JSON.stringify(req.cookies, null, 2));
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
