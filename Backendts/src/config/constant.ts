
import path from 'path';
import jwt from 'jsonwebtoken'
export const jwtSecret = 'Abhinav@123';
const encryption_key="encryptleavemangementdata123456";
var CryptoJS = require("crypto-js");
const nodemailer=require('nodemailer');
import multer from 'multer';
const fs = require("fs");
const { parse } = require("csv-parse");

export let pathTobeRead:String;


export const PgDbConfig = {
    user: 'postgres',
  host: '127.0.0.1',
  database: 'persondb',
  password: 'root',  
  port: 5432
 };

 const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


  function generateToken(user:any):string{
        return jwt.sign(
          { id: user.id, username: user.username,email:user.email },jwtSecret,
          { expiresIn: '1h' } 
        )
      };

  function generateTokenForForgetPassWord(u_email:String):string{
    const now=new Date();
    const expirytime=new Date();
    return jwt.sign(
      { 
        email:u_email,
        createdTime:now,
        
      },jwtSecret,{expiresIn:'5min'}

    )

  }
  const transport=nodemailer.createTransport({
     host: 'smtp.gmail.com',
    service:"gmail",
    secure:false,
    port:465,
    auth:{
      user:process.env.s_email,
      pass:process.env.s_password
    }

  });
  function encrypt(data:String) {
    return CryptoJS.AES.encrypt(data,encryption_key).toString();

 }
 function decrypt(data:String){
  return JSON.parse(CryptoJS.AES.decrypt(data,encryption_key).toString(CryptoJS.enc.Utf8));
 }

  
   export  {generateToken,transport,generateTokenForForgetPassWord,encrypt,decrypt,upload};