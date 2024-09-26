import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
// npm install --save-dev @types/cors

// Admin Router
import adminRouter from './routes/admin/adminRouter';
import productRouter from './routes/admin/productRouter';


// User Router
import userRouter from './routes/user/userRouter';

dotenv.config();
const server = express();
const port = process.env.PORT;
const dbURL = process.env.MONGO_DB_URL || 'your-default-db-url';

server.use(express.static('./public'));

// CORS configuration
server.use(cors({
    credentials: true 
}));

server.use(morgan('tiny'));
server.use(express.json());

/*====================> || ADMIN API || <====================*/
server.use('/api/admin', adminRouter);
server.use('/api/admin', productRouter);


/*====================> || ADMIN API || <====================*/
server.use('/api/user', userRouter);



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
  