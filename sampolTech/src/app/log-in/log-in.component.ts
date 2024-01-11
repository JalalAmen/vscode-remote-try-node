import { Component, OnInit } from '@angular/core';
import { LogInService } from './log-in.service';
import { IUserCredentials } from '../contacts/contact.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{

  
  credentials: IUserCredentials = { email: '', password: '' };
  signInError: boolean = false;
  logInForm!: FormGroup ;
  

  constructor(private logInService: LogInService, private router: Router, private fb:FormBuilder) {}

  ngOnInit():void {
      this.logInForm = this.fb.group({
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required]]
      })
  }
  
  signIn() {
    this.signInError = false;
    
    this.logInService.signIn(this.logInForm.value).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: () => (this.signInError = true),
    });
  }

}