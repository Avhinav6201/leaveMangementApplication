import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PagenotFoundComponent } from './component/pagenot-found/pagenot-found.component';
import { CanActivate } from './component/_gaurds/auth-gaurd.guard';
const routes: Routes = [
  {path:'logIn',
    component:LoginComponent,
    title:'LogIn'


  },
  {
    path:'',
    redirectTo:'logIn',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent,
    title:'Home',
    canActivate:[CanActivate]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[CanActivate]
  },
  {
    path:'reset-password/:id/:token',
    component:ResetpasswordComponent,
    title:'Reset Password'

  },{
    path:'**',
    component:PagenotFoundComponent,
    title:'404 page not found'

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
