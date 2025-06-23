import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();


const connectDB = new Client({
  host: process.env.REACT_APP_RDS_HOST,  
  database: process.env.REACT_APP_RDS_DATABASE,  
  user: process.env.REACT_APP_RDS_USER,  
  password: process.env.REACT_APP_RDS_PASSWORD,
  port: process.env.REACT_APP_RDS_PORT
});


connectDB.connect()
  .then(() => console.log('✅ Connected to AWS RDS database'))
  .catch(err => console.error('❌ RDS connection error:', err));

export { connectDB };
