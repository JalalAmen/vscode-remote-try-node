import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  isLogInPage:boolean= false;
  isRegisterPage:boolean=false;
  
}
