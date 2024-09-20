import express from 'express';
import https from 'https';
const fs = require ('fs');
import cors from 'cors';
import path from "path";
import {PgDbConfig } from './config/constant';
import router from './api/api';
import { Pool } from 'pg';


const app=express();
const pool = new Pool(PgDbConfig);
app.use(cors());
app.use('/api',router);
app.use(express.json());

console.log('API routed');


declare global{
    namespace Express{
        interface Request{
            user:any;
        }
    }
};

const key = fs.readFileSync(process.env.ssl_key,'utf8');
const cert = fs.readFileSync(process.env.ssl_cert,'utf8');
const ca = fs.readFileSync(process.env.ssl_ca,'utf8');
const options = {
  

    key: key,
    cert: cert,
    ca: ca,
	
};
const httpsport=3000;
https.createServer(options, app).listen(httpsport, () => console.log(' Server listening on port '+httpsport+'!'));
