import express from 'express';  
import dotenv from 'dotenv';
const server = express();
import mongoose from 'mongoose';

/*====================> || Admin Router Import Hear || <====================*/
import adminRouter from './routes/admin/adminRouter';

dotenv.config();
const port : Number = Number(process.env.PORT);   // server port
const dbURL : string = process.env.MONGO_DB_URL as string ;  // use for online database

server.use(express.json());


/*====================> || ADMIN API || <====================*/
server.use('/api/admin',adminRouter)

// DATABASE CONNECTION  
server.listen(port, async () => {
    mongoose.connect(dbURL)  // online databases connected
    .then(() => console.log('DB Is Connected ✔︎✔︎✔︎'))
    .catch(err => console.log(err.message));
    console.log(`server start at http://localhost:${port} ✔︎✔︎✔︎`);
});
