import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import reservationRouter from './routes/reservationRouter.js';
import morgan from 'morgan'
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert { type: "json" };
const app = express();
const PORT = 7002;

const corsOptions = {
  
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); // Middleware para manejar cookies-prove

app.use(express.json());

//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Reservation Microservice');
});

app.use('/api/reservation', reservationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



