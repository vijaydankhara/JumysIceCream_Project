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
import userProductRouter from './routes/user/productRouter';




import path from 'path';

dotenv.config();
const server = express();
const port = process.env.PORT;
const dbURL = process.env.MONGO_DB_URL || 'your-default-db-url';

// CORS configuration
server.use(cors({
    credentials: true 
}));

server.use(morgan('tiny'));
server.use(express.json());
server.use("/public/images", express.static(path.join(__dirname, 'public', 'images')));

/*====================> || ADMIN API || <====================*/
server.use('/api/admin', adminRouter);
server.use('/api/admin', productRouter);


/*====================> || ADMIN API || <====================*/
server.use('/api/user', userRouter);
server.use('/api/user', userProductRouter);



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
  