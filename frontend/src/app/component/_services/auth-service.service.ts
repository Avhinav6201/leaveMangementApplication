import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 isLoggedIn:Boolean=false;
  constructor(private router:Router) {

   }

   checkAuthentication():Boolean{

    if( sessionStorage.getItem('authToken')===null){
      this.isLoggedIn=false;
      return false;
    }else{
      this.isLoggedIn=true;
      return true
    }
   }

}
