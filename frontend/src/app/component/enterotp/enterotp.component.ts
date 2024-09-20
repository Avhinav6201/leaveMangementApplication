import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserServicesService } from '../_services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enterotp',
  templateUrl: './enterotp.component.html',
  styleUrls: ['./enterotp.component.css']
})
export class EnterotpComponent {
  otpForm: FormGroup;
  resetPasswordForm: FormGroup;
  isOtpVerified = false;

  constructor(
    private _snackbar:MatSnackBar,
   private _userService:UserServicesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnterotpComponent>, // Use MatDialogRef to close the dialog

  ) {

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });


    this.resetPasswordForm = this.fb.group({

      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmNewPassword')?.value ? null : { 'mismatch': true };
  }




  onVerifyOtp(): void {
    if (this.otpForm.valid) {
      const otp: string = this.otpForm.value.otp;
      console.log('OTP:', otp);

      this._userService.otpVerification(otp).subscribe(
        (response) => {
          if (response && response.success) { // Assuming response has a success property
            this.isOtpVerified = true;
            this._snackbar.open('OTP verified successfully', 'Close', {
              duration: 3000,
            });
            // Optionally reset the form or perform other actions
            this.otpForm.reset();
          } else {
            this.isOtpVerified = false;
            console.log('OTP verification failed');
            this._snackbar.open('Please enter the correct OTP', 'Close', {
              duration: 3000,
            });
          }
        },
        (error) => {
          this.isOtpVerified = false;
          console.error('Error during OTP verification:', error);
          this._snackbar.open('An error occurred. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      console.log('Form is invalid');
      this._snackbar.open('Please enter a valid OTP', 'Close', {
        duration: 3000,
      });
    }
  }


  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const Password = this.resetPasswordForm.value.newPassword;
      this.ResetPassword(Password);
      // Call the service to reset the password
  //     this._userService.ResetPassword(Password).subscribe(
  //       (response) => {
  //         // Check if the response indicates success
  //         if (response.success) {
  //           console.log('Password reset successful:', response);
  //           this._snackbar.open('Password has been reset successfully!', 'Close', {
  //             duration: 3000,
  //           });
  //           this.dialogRef.close();
  //           // Optionally reset the form
  //           this.resetPasswordForm.reset();
  //         } else {
  //           // Handle response indicating failure
  //           console.error('Password reset failed:', response.message);
  //           this._snackbar.open('Failed to reset password. Please try again.', 'Close', {
  //             duration: 3000,
  //           });
  //         }
  //       },
  //       (error) => {
  //         // Handle error response
  //         console.error('Error resetting password:', error);
  //         this._snackbar.open(data, 'Close', {
  //           duration: 3000,
  //         });
  //       }
  //     );
  //   } else {
  //     this._snackbar.open('Please enter a valid password.', 'Close', {
  //       duration: 3000,
  //     });
  //   }
  // }
    }
  }

async ResetPassword(Password:String){
  let data:any=await this._userService.ResetPassword(Password);
  if(data.success){
    console.log('Password reset successful:');
    this._snackbar.open(data.message, 'Close', {
      duration: 3000,
    });

  }else{
    this._snackbar.open(data.message, 'Close', {
      duration: 3000,
    });
  }
}



  closeDialog(): void {
    this.dialogRef.close();
  }
}
