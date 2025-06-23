import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = new Pool({
  host: process.env.REACT_APP_RDS_HOST,
  database: process.env.REACT_APP_RDS_DATABASE,
  user: process.env.REACT_APP_RDS_USER,
  password: process.env.REACT_APP_RDS_PASSWORD,
  port: process.env.REACT_APP_RDS_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

connectDB.connect()
  .then(() => console.log('✅ Connected to the database'))
  .catch((err) => console.error('❌ Error connecting to the database:', err));

export { connectDB };