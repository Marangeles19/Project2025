import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; // Conexión a MongoDB
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 6005;

// Conectar a la base de datos
connectDB();

// Configuración de CORS con soporte para cookies
const corsOptions = {
  origin: ["http://54.147.184.127"], // Cambia por tu frontend
  credentials: true, // Permitir envío de cookies
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // Middleware para manejar cookies

// Middleware para asegurar que las cookies sean seguras
app.use((req, res, next) => {
  if (req.cookies.token) {
    res.cookie("token", req.cookies.token, {
      httpOnly: true, // Evita acceso desde JavaScript en el navegador
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "Strict", // Protección contra ataques CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expira en 7 días
    });
  }
  next();
});


// Rutas de la API
app.get("/", (req, res) => res.send("API working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(port, () => console.log(`Server started on PORT:${port}`));
