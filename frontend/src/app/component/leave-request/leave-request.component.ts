import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserServicesService } from '../_services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { dateRangeValidator } from '../../Validator/date-validator.validator';
import { response } from 'express';
@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  leaveTypes: any[] = [];

  userleaveDetails: any[] = [];

  leaveForm!: FormGroup;
  minDate: Date = new Date();
dateRangeInvalid: any;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _userservice: UserServicesService,
    private _snackbar: MatSnackBar
  ) {
    this.leaveRequestForm();
  }

  ngOnInit(): void {
    this.getUserDetails();

  }

  leaveRequestForm(): void {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(50)]]
    }, {validator: this.dateRangeValidator } );
  }


  async getUserDetails() {

      const data: any = await this._userservice.getUserLeave();
      console.log(data)
      if (data.success){
        this.userleaveDetails = data.result.rows;
         console.log('User leave details:', this.userleaveDetails);
         }else {
          console.log(data.success)
      console.error('Error fetching user leave details:');
    }
  }



  noOfDays(startDate: Date, endDate: Date): any {
    const stime = startDate.getTime();
    const etime = endDate.getTime();
    const timeDiff = etime - stime;
    const milliSecInOneDay = 1000 * 60 * 60 * 24;
    const days= Math.floor(timeDiff / milliSecInOneDay);
      return days;
  }


  onSubmit(): void {
    if (this.leaveForm.valid) {
      // Extract form values
      const { leaveType, startDate, endDate, reason } = this.leaveForm.value;
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const noOfDays = this.noOfDays(startDateObj, endDateObj);
      this.RegisterForLeave(noOfDays,leaveType,reason,startDate,endDate);
      console.log('Form Submitted!', this.leaveForm.value);
      this.leaveForm.reset();
      this.closeDialogBox();
    } else {
      this._snackbar.open('Form is not valid. Please fill all required fields.', 'Close', { duration: 2000 });
      console.log('Form is not valid');
    }
  }
  async RegisterForLeave(noOfDays: number, leaveType: string, reason: string, startDate: Date, endDate: Date){
      let data:any=await this._userservice.registerForLeave(noOfDays,leaveType,reason,startDate,endDate);
      console.log(data)
      if(data.sucess){
        this._snackbar.open(data.message, 'Close', { duration: 2000 });
      }else{
        this._snackbar.open(data.message, 'Close', { duration: 2000 });
      }

  }
  closeDialogBox(): void {
    this.dialog.closeAll();
  }
   dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const startDate = group.controls['startDate'].value;
    const endDate = group.controls['endDate'].value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRangeInvalid: true};
    }else{

    return null;
    }
  }


}
