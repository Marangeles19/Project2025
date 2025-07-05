import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = new Pool({
  host: process.env.RDS_HOST,
  database: process.env.RDS_DATABASE,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  port: parseInt(process.env.RDS_PORT, 10),
 ssl: {
    rejectUnauthorized: false
  } 
});


connectDB.connect()
  .then(() => console.log('✅ Connected to the database'))
  .catch((err) => console.error('❌ Error connecting to the database:', err));

export { connectDB };
