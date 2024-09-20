import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServicesService } from '../_services/user-services.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgotPasswordForm: FormGroup;
  email!: string;
  isLoading = false;  // Track the loading state

  constructor(
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private _userService: UserServicesService,
    private dialogRef: MatDialogRef<ForgetpasswordComponent>
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const email: string = this.forgotPasswordForm.value.email;
      this.email = email;


      this.isLoading = true;

      this.sendEmail(email)
        .finally(() => {

          this.isLoading = false;
          this.closeDialog();
        });

    } else {
      console.log('Form is invalid');
      this.snackbar.open('Please enter a valid email address.', 'Close', {
        duration: 3000,
      });
    }
  }

  public async sendEmail(email: string): Promise<void> {
    try {
      const data: any = await this._userService.sendEmail(email);
      if (data.success) {
        this.snackbar.open('Link for resetting password was sent successfully to your email.', 'Close', { duration: 3000 });
      } else {

        this.snackbar.open(data.message, 'Close', { duration: 3000 });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      this.snackbar.open('An error occurred while sending the email. Please try again.', 'Close', { duration: 3000 });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();  // Correct method to close the dialog
  }
}

    //   this.otpForm = this.fb.group({
  //     otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  //   });

  //   this.resetPasswordForm = this.fb.group({
  //     newPassword: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmNewPassword: ['', [Validators.required]]
  //   }, { validator: this.passwordMatchValidator });
  // }

//   onVerifyOtp(): void {
//     if (this.otpForm.valid) {
//       const otp: string = this.otpForm.value.otp;
//       console.log('Verify OTP:', otp);

//       // Call the OTP verification service
//       this._userService.otpVerification(otp).subscribe(
//         (response: any) => {
//           console.log('OTP verified successfully');
//           this.snackbar.open('OTP verified successfully.', 'Close', {
//             duration: 3000,
//           });

//           this.isOtpVerified = true; // Update state to show reset password form
//         },
//         (error: any) => {
//           console.error('Error verifying OTP:', error);
//           this.snackbar.open('Failed to verify OTP. Please try again.', 'Close', {
//             duration: 3000,
//           });
//         }
//       );
//     } else {
//       console.log('OTP form is invalid');
//       this.snackbar.open('Please enter a valid 6-digit OTP.', 'Close', {
//         duration: 3000,
//       });
//     }
//   }

//   onResetPassword(): void {
//     if (this.resetPasswordForm.valid) {
//       const newPassword: string = this.resetPasswordForm.value.newPassword;
//       console.log('Reset password:', newPassword);
//       this.ResetPassword(newPassword);

//   }
// }

//   passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
//     if (group) {
//       const password = group.controls['newPassword'];
//       const confirmPassword = group.controls['confirmNewPassword'];
//       if (password.value !== confirmPassword.value) {
//         return { mismatch: true };
//       }
//     }
//     return null;
//   }
//   async ResetPassword(Password:String){
//     let data:any=await this._userService.ResetPassword(Password);
//     if(data.success){
//       console.log('Password reset successful:');
//       this.snackbar.open(data.message, 'Close', {
//         duration: 3000,
//       });
//       this.isOtpSent = false;
//       this.isOtpVerified = false;
//       this.forgotPasswordForm.reset();
//       this.otpForm.reset();
//       this.resetPasswordForm.reset();

//       this.dialogRef.close();

//     }else{
//       this.snackbar.open(data.message, 'Close', {
//         duration: 3000,
//       });
//     }
//   }

