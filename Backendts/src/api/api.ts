import express from 'express';
import userController from '../controller/user.controller';
import { isAutheticated } from '../controller/auth.controller';
import { upload } from '../config/constant';
const router=express.Router();


console.log('registering the routes')

router.post('/login',async(req:any,res:any)=>{
    try{
        let result=await userController.logIn(req,res);
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});

    }
})
router.post('/uploadcsv',upload.single('file'),async(req:any,res:any)=>{
   console.log('api hit')
    try{
        let result=await userController.upload(req,res);
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});

    }

   



})
router.post('/register',async(req:any,res:any)=>{
    try{
        let result=await userController.register(req,res);
        
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});


    }
})
router.post('/sendEmail',async(req:any,res:any)=>{
    try{
        let result=await userController.ForgetPassword(req,res);
       
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});
    }
})
router.post('/resetPassword',async(req:any,res:any)=>{
    try{
        let result=await userController.resetPassword(req,res);
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});

    }
})
router.get('/genrateOtp',async(req:any,res:any)=>{
    try{
        let result=await userController.generateOtp(req,res);
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});

    }
})
router.get('/verifyOtp',async(req:any,res:any)=>{
    try{
        let result=await userController.verifyOtp(req,res);
        res.json(result)
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});

    }
})
router.post('/validatetoken',async(req:any,res:any)=>{
    try{
    let result=await userController.verifyToken(req,res);
    res.json(result);
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});
        
    }
})
router.use(isAutheticated);
router.post('/registerForLeave',async(req:any,res:any)=>{
    try{
        let result=await userController.registerForLeave(req,res);
            res.json(result)
    
    }catch(e:any){
        res.json({success:false,error:true,message:e.message})
    }
})

router.get('/getLeavedetails',async(req:any,res:any)=>{
    try{
    let result=await userController.getUserLeave(req,res);
    res.json(result);
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});
     
    }
})
router.get('/getUserLeavedetails',async(req:any,res:any)=>{
    try{
    let result=await userController.getUserLeaveDetails(req,res);
    res.json(result);
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});
     
    }
})
router.get('/getUserLeave',async(req:any,res:any)=>{
    try{
    let result=await userController.getUserLeaveName(req,res);
    res.json(result);
    }catch(e:any){
        res.json({success:false,error:true,message:e.message});
     }
})
router.post('/uploadcsv',upload.single('file'),async(req:any,res:any)=>{
    console.log('api hit')
     try{
         let result=await userController.upload(req,res);
         res.json(result)
     }catch(e:any){
         res.json({success:false,error:true,message:e.message});
 
     }
 
    
 
 
 
 })
console.log('Routes Registered')
export default router;