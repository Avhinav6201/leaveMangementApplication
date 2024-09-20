import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../_services/user-services.service';
import { ActivatedRoute } from '@angular/router';
import jwt from 'jsonwebtoken';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{
  resetPasswordForm: FormGroup;
  jwtsecret!:string;
  token!:string;
  user_id!:number;
  isValidated!:boolean;



  constructor(  private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private _userService: UserServicesService,private route:ActivatedRoute,
    private router: Router){

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
      confirmNewPassword: ['', [Validators.required,Validators.minLength(8)]]
    }, { validator: this.passwordMatchValidator });

  }
  ngOnInit(): void {
   this.token= this.route.snapshot.params['token'];
   this.user_id=this.route.snapshot.params['id'];
   this.jwtsecret=this.route.snapshot.params['jwtsecret'];
   this.validatedResponse();
  }
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    if (group) {
      const password = group.controls['newPassword'];
      const confirmPassword = group.controls['confirmNewPassword'];
      if (password.value !== confirmPassword.value) {
        return { mismatch: true };
      }
    }
    return null;
  }
  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword: string = this.resetPasswordForm.value.newPassword;
      this.ResetPassword(newPassword);


  }else{
    this.snackbar.open('please fill the form correctly','close',{duration:2000})
  }



}
async ResetPassword(Password:String){
  let data:any=await this._userService.ResetPassword(Password);
  if(data.success){
    this.router.navigate(['/logIn'])
    alert(data.message);


}else{
    this.snackbar.open(data.message,'close',{duration:3000})
  }

}

async validatedResponse(){
  let data:any=await this._userService.validateToken(this.token,this.user_id);
  if(data.success){
    this.isValidated=true;
    this.snackbar.open(data.message,'close',{duration:3000})

  }else{
    this.isValidated=false;
    this.snackbar.open(data.message,'close',{duration:3000})
    this.router.navigate(['/logIn'])
  }
}


}
