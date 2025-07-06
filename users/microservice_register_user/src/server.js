import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRouter.js';
import morgan from 'morgan'
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './src/swagger.json' assert { type: "json" };
const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  // origin: "http://54.147.184.127",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); // Middleware para manejar cookies-prove

app.use(express.json());

//app.use('/users', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the User Microservice');
});

app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



