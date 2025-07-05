import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import catalogRouter from './routes/catalogRouter.js';
import morgan from 'morgan'
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert { type: "json" };
const app = express();
const PORT = 3003;

const corsOptions = {
  
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); // Middleware to manage cookies-prove

app.use(express.json());

//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Catalog Microservice');
});

app.use('/api/catalog', catalogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



