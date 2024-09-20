import { inject } from "@angular/core"
import { AuthServiceService } from "../_services/auth-service.service";
import { Router } from "@angular/router";

export const CanActivate=()=>{
  const AuthService=inject(AuthServiceService);
  const router=inject(Router);
  if(AuthService.checkAuthentication()){
    return true;

  }else{
    router.navigate(['/logIn']);
    return false;
  }

}
