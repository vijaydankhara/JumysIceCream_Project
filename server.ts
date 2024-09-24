import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
// npm install --save-dev @types/cors
import adminRouter from './routes/admin/adminRouter';

dotenv.config();
const server = express();
const port = process.env.PORT;
const dbURL = process.env.MONGO_DB_URL || 'your-default-db-url';

// CORS configuration
server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST'],
    credentials: true 
}));


server.use(express.json());

/*====================> || ADMIN API || <====================*/
server.use('/api/admin', adminRouter);




// DATABASE CONNECTION  
server.listen(port, async () => {
    try {
      await mongoose.connect(dbURL);
      console.log('DB is Connected ✔︎✔︎✔︎');
      console.log(`Server started at http://localhost:${port} ✔︎✔︎✔︎`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('DB connection error:', error.message);
      } else {
        console.error('DB connection error:', error);
      }
    }
  });
  
