import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


constructor(private _router:Router){

}
currentComponent: string = 'dashboard';
showComponent(componentName: string): void {
  this.currentComponent = componentName; // Update the current component to display
}

  onlogout():void{
    sessionStorage.clear();
    this._router.navigate(['/logIn'])
  }
}
