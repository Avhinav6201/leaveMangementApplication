import express from 'express';
import cors from 'cors';
import {encrypt, PgDbConfig } from './config/constant';
import router from './api/api';
import { Pool } from 'pg';
const app = express();
const pool = new Pool(PgDbConfig);
// Use CORS middleware
 
app.use(cors());
// Middleware to parse JSON 
app.use(express.json());
declare global{
    namespace Express{
        interface Request{
            user:any;
        }
    }
};

app.use('/api',router);
console.log('API routed');

const port=8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});