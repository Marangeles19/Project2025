import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; 
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import morgan from 'morgan';

const app = express();
const port = 6005;

connectDB();

const corsOptions = {
  origin: "http://54.147.184.127", // IP del frontend en EC2
  credentials: true, // Permitir cookies en peticiones
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));  // 🔹 CORS debe ir antes de express.json()
app.use(cookieParser());     // 🔹 Cookie parser aquí
app.use(express.json()); 
app.use(morgan('dev'));

// Middleware para ver las cookies en cada petición
app.use((req, res, next) => {
  console.log("Cookies recibidas:", req.cookies);
  next();
});

// API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
