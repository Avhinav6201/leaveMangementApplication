import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { EnterotpComponent } from './component/enterotp/enterotp.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './component/header/header.component';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HistoryComponent } from './component/history/history.component';
import { LeaveRequestComponent } from './component/leave-request/leave-request.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthInterceptorService } from './component/_services/auth-interceptor.service';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { PagenotFoundComponent } from './component/pagenot-found/pagenot-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

    ForgetpasswordComponent,
    EnterotpComponent,

    HeaderComponent,

    DashboardComponent,
    HistoryComponent,
    LeaveRequestComponent,
    ResetpasswordComponent,
    PagenotFoundComponent

  ],
  imports: [
    MatProgressSpinnerModule,
    MatNativeDateModule,
    BrowserModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule ,
    MatIconModule,MatProgressBarModule,
    MatDividerModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],

})
export class AppModule { }
