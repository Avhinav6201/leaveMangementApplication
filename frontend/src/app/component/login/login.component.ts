import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServicesService } from '../_services/user-services.service';
import { HttpClient } from '@angular/common/http';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  activeForm: 'login' | 'register'='login';
  private user: any[] | undefined;


  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackbar: MatSnackBar,
    private _userService: UserServicesService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      empId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // New form for OTP input
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]  // OTP as a 6-digit number
    });
  }

  toggleForm(form: 'login' | 'register' ) {
    this.activeForm = form;
  }


  openForgotPasswordDialog() {
    this.dialog.open(ForgetpasswordComponent, {
      // width: '500px', // You can adjust the width as needed
    });
  }

 async login(email:String,password:String){
  let data:any=await this._userService.login(email,password);
  if(data.success && data.token){
    sessionStorage.setItem('authToken', data.token);
    sessionStorage.setItem('user',data.userData.name)
    sessionStorage.setItem('user_data',JSON.stringify(data.userData));
    this._snackbar.open(data.message, 'Close', { duration: 2000 });
    this.router.navigate(['/home']);
  }else{
    this._snackbar.open(data.message, 'Close', { duration: 2000 });
  }
 }
 onLogin():void{
  if(this.loginForm.valid){
    const { email, password } = this.loginForm.value;
    this.login(email,password);

  }else{
    this._snackbar.open('Please fill out the form correctly.', 'Close', { duration: 2000 })
  }
 }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, email, designation, empId, password } = this.registerForm.value;

      this._userService.register(name, email, designation, empId, password).subscribe(
        response => {
          if (response.success) {  // Check the 'success' field in the response
            this._snackbar.open('Registration successful! Please login.', 'Close', { duration: 2000 });
            this.toggleForm('login'); // Switch to login form after successful registration
          } else {
            this._snackbar.open('User Already Exist.', 'Close', { duration: 2000 });
          }
        },
        error => {
          this._snackbar.open('Registration failed. Please try again later.', 'Close', { duration: 2000 });
        }
      );
    } else {
      this._snackbar.open('Please fill out the form correctly.', 'Close', { duration: 2000 });
    }
  }



  onVerifyOtp(): void {
    if (this.otpForm.valid) {
      const { otp } = this.otpForm.value;


      this._snackbar.open('OTP verified successfully!', 'Close', { duration: 2000 });



    } else {
      this._snackbar.open('Please enter a valid OTP.', 'Close', { duration: 2000 });
    }
  }

}
