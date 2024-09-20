import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {jwtSecret} from '../config/constant'
const Key=jwtSecret;

const isAutheticated=(req:Request,res:Response,next:NextFunction)=>{

 const Authheader = req.get('authToken');
  if(!Authheader){
    console.log("no token")
    return {Success:false,message:'404 not found'}
  }
  let token=Authheader.split(' ')[1];
let decodeddata;
try{
    decodeddata=jwt.verify(token,Key);
   
    // return{
    //     success:true,message:'User Validated'
    //  }
    req.user=decodeddata;
    next();
}catch(err){
 console.log("wrong credential"+err);
 return{
    success:false,message:'User not  Validated'
 }
}

   



}
export {isAutheticated};