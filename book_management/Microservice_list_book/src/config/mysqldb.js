import { Sequelize } from "sequelize";
import 'dotenv/config';

const database = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await database.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

export { database, connectDB };

