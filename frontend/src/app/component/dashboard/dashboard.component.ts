import { Component, OnInit } from '@angular/core';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';
import { MatDialog } from '@angular/material/dialog';
import { UserServicesService } from '../_services/user-services.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _userService: UserServicesService
  ) {}
  ngOnInit(): void {
    this.getUserDetails();
  }
  user = sessionStorage.getItem('user') || '';
  username: string = `Hii , ${this.user}`;
  // available:Number=42;
  userleaveDetails: any[] = [];
  sick_available: number = 0;
  sick_used: number = 0;
  sick_percentage: number = 0;
  Earned_available: number = 0;
  Earned_used: number = 0;
  Earned_percentage: number = 0;
  casual_available: number = 0;
  casual_used: number = 0;
  casual_percentage: number = 0;
  Adjustment_available: number = 0;
  Adjustment_used: number = 0;
  Adjustment_percentage: number = 0;
  unpaid_available: number = 0;
  unpaid_used: number = 0;
  unpaid_percentage: number = 0;
  special_available: number = 0;
  special_used: number = 0;
  special_percentage: number = 0;
  half_leave_available: number = 0;
  half_leave_used: number = 0;
  half_leave_percentage: number = 0;

  RequestTimeoff() {
    this.dialog.open(LeaveRequestComponent, {
      width: '500px',
    });
  }
  async getUserDetails() {
    let data: any = await this._userService.getUserLeavedetails();
    if (data.success) {
      this.userleaveDetails = data.result.rows;
      this.iterateLeaveDetails();

      console.log(data.result.rows);
    } else {
      console.log('not able to fetch');
    }
  }
  iterateLeaveDetails() {
    // Iterating using forEach
    for (let i = 0; i < this.userleaveDetails.length; i++) {
      if (this.userleaveDetails[i].leave_type_id === 1) {
        this.sick_available = this.userleaveDetails[i].available;
        this.sick_used = this.userleaveDetails[i].used;
        this.sick_percentage =
          (this.sick_available / (this.sick_used + this.sick_available)) * 100;
        console.log(this.sick_percentage);
      } else if (this.userleaveDetails[i].leave_type_id === 2) {
        this.Earned_available = this.userleaveDetails[i].available;
        this.Earned_used = this.userleaveDetails[i].used;
        this.Earned_percentage =
          (this.Earned_available / (this.Earned_used + this.Earned_available)) * 100;
        console.log(this.sick_percentage);
      }  else if (this.userleaveDetails[i].leave_type_id === 3) {
        this.Adjustment_available = this.userleaveDetails[i].available;
        this.Adjustment_used = this.userleaveDetails[i].used;
        this.Adjustment_percentage =
          (this.Adjustment_available /
            (this.Adjustment_available + this.Adjustment_percentage)) *
          100;
      } else if (this.userleaveDetails[i].leave_type_id === 4) {
        this.unpaid_available = this.userleaveDetails[i].available;
        this.unpaid_used = this.userleaveDetails[i].used;
        this.unpaid_percentage =
          (this.unpaid_available / (this.unpaid_available + this.unpaid_used)) *
          100;
      } else if (this.userleaveDetails[i].leave_type_id === 5) {
        this.half_leave_available = this.userleaveDetails[i].available;
        this.half_leave_used = this.userleaveDetails[i].used;
        this.half_leave_percentage =
          (this.half_leave_available /
            (this.half_leave_available + this.half_leave_used)) *
          100;
      } else if (this.userleaveDetails[i].leave_type_id === 6) {
        this.casual_available = this.userleaveDetails[i].available;
        this.casual_used = this.userleaveDetails[i].used;
        this.casual_percentage =
          (this.casual_available / (this.casual_available + this.casual_used)) *
          100;
      }
    }
  }
}
