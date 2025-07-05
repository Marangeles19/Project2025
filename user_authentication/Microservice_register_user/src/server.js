import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; 
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const port = 6003;

connectDB();


const allowedOrigins = ['http://54.147.184.127'];  // Si estás trabajando localmente con Vite
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); // Permitir cualquier origen

// API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
  });

app.listen(port, () => console.log(`Server started on PORT:${port}`));
