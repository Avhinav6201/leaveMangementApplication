import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EncryptionDecryptionService } from './encryption-decryption.service';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  email!:String;

  private apiUrl = 'http://localhost:8000/api';
  constructor(private http:HttpClient,private encryption:EncryptionDecryptionService) { }
 

  // login(email: string, password: string): Observable<any> {
  //  let obj={"email":email,"password":password}

  //  let encryptedObj=this.encryption.encryptData(JSON.stringify(obj));
  //   return this.http.post<any>(`${this.apiUrl}/login`,encryptedObj).pipe(
  //     map(response => {
  //       if (response && response.token) {
  //         return response;
  //       } else {
  //         throw new Error('Invalid response');
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Login error:', error);
  //       return of(null);
  //     })
  //   );
  // }

  async login(email:String,password:String){
    let payload={
      "email":email,"password":password
    }
    let encryptedPayload=this.encryption.encryptData(JSON.stringify(payload));
    const encryptedresponse=await lastValueFrom(this.http.post(`${this.apiUrl}/login`,{encryptedPayload}))
    if(typeof encryptedresponse=='string'){
      const decryptedResponse = this.encryption.decryptData(encryptedresponse);
        return JSON.parse(decryptedResponse);
      }else{
        return{success:false,message:'respone type is not an object'}

      }

  }
  register(name: string, email: string, designation: string, empId: string, password: string): Observable<any> {
    let obj={ "name":name, "email": email, "desiginaton":designation, "empId":empId,"password":password }
    let encryptedObj=this.encryption.encryptData(JSON.stringify(obj))
    return this.http.post<any>(`${this.apiUrl}/register`,encryptedObj ).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return of(null);
      })
    );
  }

otpGenration(email: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/genrateOtp`, {
      params: { email }
  }).pipe(
      map(response => {
          if (response) {
              return response;
          } else {
              throw new Error('Invalid response');
          }
      }),
      catchError(error => {
          console.error('OTP Generation error:', error);
          return of(null);
      })
  );
}
otpVerification( otp: string | number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/verifyOtp`, {
    params: {  otp: otp.toString() }
  }).pipe(
    map(response => {
      if (response) {
        return response;
      } else {
        throw new Error('Invalid response');
      }
    }),
    catchError(error => {
      console.log(error)
      console.error('OTP Verification error:', error);
      return throwError(() => new Error('OTP Verification failed'));
    })
  );
}

async ResetPassword(password:String){

  const payload={
    "password":password
  };
  const encryptedPayload=this.encryption.encryptData(JSON.stringify(payload))
  console.log(payload)

  const encryptedresponse = await lastValueFrom(this.http.post(`${this.apiUrl}/resetPassword`,{encryptedPayload}));
  if(typeof encryptedresponse=='string'){
    const decryptedResponse = this.encryption.decryptData(encryptedresponse);
      return JSON.parse(decryptedResponse);
    }else{
      return{success:false,message:'respone type is not an object'}

    }

}
// registerForLeave(noOfDays:Number,leaveType:String,reason:String,startDate:Date,endDate:Date):Observable<any>{
//   return this.http.post<any>(`${this.apiUrl}/registerForLeave`,{noOfDays,reason,leaveType,startDate,endDate});
// }
async registerForLeave(noOfDays: number, leaveType: string, reason: string, startDate: Date, endDate: Date) {

    const payload = {
      "noOfDays":noOfDays,
     "leaveType":leaveType,
      "reason":reason,
     "startDate":startDate,
      "endDate":endDate
    }
    const encryptedPayload=this.encryption.encryptData(JSON.stringify(payload))
    const encryptedresponse = await lastValueFrom(this.http.post(`${this.apiUrl}/registerForLeave`,{encryptedPayload}));
    if(typeof encryptedresponse=='string'){
      const decryptedResponse = this.encryption.decryptData(encryptedresponse);
        return JSON.parse(decryptedResponse);
      }else{
        return{success:false,message:'respone type is not an object'}

      }
  }
async getLeavedetails(){
  const encryptedresponse=await lastValueFrom(this.http.get(`${this.apiUrl}/getLeavedetails`))
  if(typeof encryptedresponse=='string'){
    const decryptedResponse = this.encryption.decryptData(encryptedresponse);
      return JSON.parse(decryptedResponse);
    }else{
      return{success:false,message:'respone type is not an object'}

    }
}
async getUserLeavedetails(){
  const encryptedresponse=await lastValueFrom(this.http.get(`${this.apiUrl}/getUserLeavedetails`))
  if(typeof encryptedresponse=='string'){
    const decryptedResponse = this.encryption.decryptData(encryptedresponse);
      return JSON.parse(decryptedResponse);
    }else{
      return{success:false,message:'respone type is not an object'}

    }
}
async getUserLeave(){
  const encryptedresponse=await lastValueFrom(this.http.get(`${this.apiUrl}/getUserLeave`))
  if(typeof encryptedresponse=='string'){
    const decryptedResponse = this.encryption.decryptData(encryptedresponse);
    console.log(decryptedResponse)
      return JSON.parse(decryptedResponse);
    }else{
      return{success:false,message:'respone type  an object'}

    }
}
async validateToken(token:String,user_id:number){
  const payload={"token":token,"user_id":user_id};
  const encryptedPayload=this.encryption.encryptData(JSON.stringify(payload))
  const encryptedresponse=await lastValueFrom(this.http.post(`${this.apiUrl}/validatetoken`,{encryptedPayload}))

  if(typeof encryptedresponse=='string'){
    const decryptedResponse = this.encryption.decryptData(encryptedresponse);
      return JSON.parse(decryptedResponse);
    }else{
      return{success:false,message:'respone type is not an object'}

    }

}
async sendEmail(email:String){
  this.email=email;
 console.log(email);
  const payload={"email":email};
  console.log(JSON.stringify(payload))
  console.log(this.encryption.encryptData(JSON.stringify(payload)))
  const encryptedPayload=this.encryption.encryptData(JSON.stringify(payload))

const encryptedresponse = await lastValueFrom(this.http.post(`${this.apiUrl}/sendEmail`, {encryptedPayload}));

  if(typeof encryptedresponse=='string'){
  const decryptedResponse = this.encryption.decryptData(encryptedresponse);
    return JSON.parse(decryptedResponse);
  }else{
    return{success:false,message:'respone type is not an object'}

  }

}



}


