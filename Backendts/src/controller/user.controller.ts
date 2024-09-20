import { Request, Response } from "express";
import UserModel from "../Model/user.model";
import { decrypt, encrypt, generateToken, generateTokenForForgetPassWord, jwtSecret } from '../config/constant';
import userModel from "../Model/user.model";
import {transport} from "../config/constant"
import jwt, { JwtPayload } from 'jsonwebtoken';


class UserController {
  private Otp!: string; 
  private u_email!:string;
  private user_id!:number;
 decodeddata:any

 
 
  public async register(req: Request, res: Response){
    const { name, email, password, empId, designation } = req.body;
    try {
      // Check if the user already exists
      const userExists = await UserModel.findByemail(email);
      if (userExists.rows.length > 0) {
        return { success: false, message: 'User already exists.' };
      }

      // Create a new user
      const result = await UserModel.createUser(name, email, password, designation, empId);

      if (result.success) {
        return { success: true, message: 'User registered successfully.' };
      } else {
        return { success: false, message: 'Error registering user.' };
      }
    } catch (error) {
      console.error('Error in user registration:', error);
      return { success: false, message: 'Internal server error.' };
    }
  }

  public async logIn(req: Request, res: Response){
    const { encryptedPayload } = req.body;
    const decryptedObj=decrypt(encryptedPayload);
     
    try {
      this.u_email=decryptedObj.email;
      
      // Find the user by email
      const user = await UserModel.findByemail(decryptedObj.email);
  
      if (user.rows.length === 0) {
        return { success: false, message: 'Invalid email or password.' };
      }else{
      
     
      const userData = user.rows[0];
      
              
              console.log(await UserModel.comparePassword(decryptedObj.password, userData.password));
      if (await UserModel.comparePassword(decryptedObj.password, userData.password)) {
        const token = generateToken(userData);
        return encrypt(JSON.stringify({ success: true, message: 'Login Successful', token ,userData}));
      } else {
        return encrypt(JSON.stringify( { success: false, message: 'Invalid email or password.' }));
      }
    } 
  }catch (error) {
      console.log(error);
      return encrypt(JSON.stringify({ success: false, message: 'Error in login.' }));
    }
  }


  public  async ForgetPassword(req:Request,res:Response){
        // this.isVisited=false;
      
      console.log(req.body)  ;

    const {encryptedPayload}=req.body;
    console.log(encryptedPayload);
    const decryptedObj=decrypt(encryptedPayload);

    const email=decryptedObj.email
    console.log('email', decryptedObj.email);
    try {
     const user=await userModel.findByemail(email)
       console.log(user.rows[0])
      
     if(user.rows.length>0){  
     
      this.user_id=user.rows[0].id;

      console.log("new user id+++++")
      
      const token=generateTokenForForgetPassWord(email)
      const link=`http://localhost:4200/reset-password/${user.rows[0].id}/${token}`
      const mailOptions = {
        from: process.env.s_email, // Sender address
        to: email, // List of recipients
        subject: 'Leave Mangement Password Reset', 
        text: 'be happy', // Plain text body
        html: `<b>Leave Mangement Password Reset!!</b>
        <br>
        <b>Dear ${user.rows[0].name}</b>
        <br>
        <p>We heard that you lost your Leave Mangement Application password. Sorry about that!  But don’t worry!<br> 
        You can use the following link to reset your password:</p><br>
        <p>${link}</p> 
        `
        
      }
     
      const info =await transport.sendMail(mailOptions); // Await sending of email
      console.log('Email sent: ' + info.response);
      console.log('token',token)
      const resetToken=await userModel.getResetPasswordToken(user.rows[0].id)
      console.log(resetToken.rows.length)
      if(resetToken.rows.length>0){
        await userModel.UpdateResetPasswordToken(user.rows[0].id,token);
      }else{
        await userModel.InsertResetPasswordToken(token,user.rows[0].id)
      }


      return encrypt(JSON.stringify({success:true, message: 'Email sent successfully',link:link}));
      }else{
           return encrypt(JSON.stringify({
            success:false,message:'please do the signup process'
          }))
      }
     }catch (error){
      console.error('Error while sending email:', error);
      return encrypt(JSON.stringify({ error: 'Failed to send email' })); // Send error response to client
    }
  };

  public async verifyToken(req:Request,res:Response){
    const {encryptedPayload}=req.body
    const decryptedObj=decrypt(encryptedPayload);
   
    try{
      const dbtoken=await userModel.getResetPasswordToken(decryptedObj.user_id);
     if(dbtoken.rows.length>0 && dbtoken.rows[0].token===decryptedObj.token){
      const decode=jwt.verify(decryptedObj.token,jwtSecret);
      this.decodeddata=decode
       console.log(decode)   
      return encrypt(JSON.stringify({
        success:true,message:'valid token',data:decode
    }))
     
     }else{
        return encrypt(JSON.stringify({
          success:false,message:'link expired please resend the email to reset the password'
      }))
     
     }
    
    }catch(err:any){
      console.log(err)
      return encrypt(JSON.stringify({
        success:false,message:'link expired please resend the email to reset the password'
      }))
    
      
    }
  }
  

  public generateOtp = (req: Request, res: Response) => {
    const email: string = req.query.email as string;
    this.u_email=email;
    console.log(`Received email: ${email}`);

    const num: number = Math.floor(Math.random() * 900000) + 100000;
    this.Otp = num.toString(); // Store OTP in the class instance

    console.log(`Generated OTP: ${this.Otp}`);

    return{ message: 'OTP generated successfully. Please check your email.' };
  };

  public verifyOtp = (req: Request, res: Response)=> {
    const enteredOtp: string = req.query.otp as string; // Extract OTP from query parameters

    console.log(`Entered OTP: ${enteredOtp}`);
    console.log(`Stored OTP: ${this.Otp}`);

    if (!enteredOtp) {
      return { success: false, error: 'OTP is required for verification.' };
    }

    // Compare the entered OTP with the stored OTP
    if (enteredOtp === this.Otp) {
      console.log('OTP verification successful');
      return { success: true, message: 'OTP verified successfully.' };
    } else {
      console.log('Invalid OTP');
    //   return { success: false, error: 'Invalid OTP. Please try again.' };
    }
  };
  public async resetPassword(req: Request, res: Response){
    const {encryptedPayload} = req.body;
    const decryptedObj=decrypt(encryptedPayload)
     console.log(decryptedObj.password)
    try {
     
      
        this.u_email=this.decodeddata.email;
      
      // Update the user's password in the database
      const result = await UserModel.updatePassword(this.u_email,decryptedObj.password);
      console.log(result);
      if (result.success && result.rowCount>0) {
        console.log('Password updated successfully');
        const deletedtoken=await UserModel.deleteResetPasswordToken(this.user_id);
        
        console.log(deletedtoken);
        return encrypt(JSON.stringify({ success: true, message: 'Password reset successfully redirecting to the logIn page ' }));
      } else {
        return encrypt(JSON.stringify({ success: false, message: 'please do signup process.' }));
      }
    } catch (error) {
      console.error('Error in resetting password:', error);
      return encrypt(JSON.stringify({ success: false, message: 'Internal server error.' }));
    }
  }
  public async registerForLeave(req:Request,res:Response){
     
    const{encryptedPayload}=req.body;
    const decryptedObj=decrypt(encryptedPayload);
   try {
    
    const result=await UserModel.checkforleave(req.user.id,decryptedObj.leaveType);
    const leave=result.rows[0];
    if(result.success){
     if(leave==null||undefined){
      
      console.log('insufficient Leave')
      return encrypt(JSON.stringify({ success: false, message: 'Internal server error.' }))
     }else if(leave.available>=decryptedObj.noOfDays){
        const newAvailable=Number(leave.available)-Number(decryptedObj.noOfDays);
        const UpdatedUsed=Number(leave.used)+Number(decryptedObj.noOfDays);
        
        const Updatedresult=await UserModel.updateUserLeave(req.user.id,decryptedObj.leaveType,UpdatedUsed,newAvailable);
      
         if(Updatedresult.success)
        {
          const result=await UserModel.userleaveRequest(req.user.id,decryptedObj.startDate,decryptedObj.endDate,decryptedObj.leaveType,decryptedObj.noOfDays,decryptedObj.reason);
        if(result.rowCount>0){
          console.log('Updated Sucessfully')
          return encrypt(JSON.stringify({success:true,message:'Applied for leave Sucessfully'}));
        }else{
          return encrypt(JSON.stringify({ success:false,message:'some error occurred during the updation'}))
        }

         }else{
          return encrypt(JSON.stringify({success:false,message:'you are not eligible to take leave'}));
         }
      }else{
        return encrypt(JSON.stringify( {
          sucess:true,message:'Currently you are not having available Leave'
        }))
      }
     }
    
    
   } catch (error) {
    console.log(error)

   }
    
   
    
     
    
  }
  public async getUserLeave(req:Request,res:Response){
    try{
     let result=await UserModel.getLeaveType();
     if(result.success){
     
      return encrypt(JSON.stringify({success:true,  message:'Leave type Fetched Successfully',"result":result}))
     }else{
      return encrypt(JSON.stringify({success:false,message:'not able to fetch leaveType'}))
     }
    }catch(err){
      console.log(err)

    }
  

}
public async getUserLeaveDetails(req:Request,res:Response){
  try {
    const userId=Number(req.user.id);
    // console.log(req.user.id)
    const result=await UserModel.getUserleaveDetails(userId);
    if(result.success){
      // console.log(result)
      return encrypt(JSON.stringify({
        success:true,message:'user leave details fetched',result
      }))
    }else{
      return encrypt(JSON.stringify({
        success:false,
        message:'user leave details not fetched'
      }))

    }

    
  } catch (error) {
    
  }

}
async getUserLeaveName(req:Request,res:Response)
{
  try {
    let result=await UserModel.getUserLeave(req.user.id);
    if(result.success){
      console.log(result.rows);
      return encrypt(JSON.stringify({
        success:true,
        message:'user leave type id fetched Sucessfully',
       result
      }))
    }else{
      return encrypt(JSON.stringify({
        success:false,
        message:'not able to fetch leave id  '
      }))

      }
    }catch (error) {
    console.log(error);
  }

}



}
export default new UserController();
