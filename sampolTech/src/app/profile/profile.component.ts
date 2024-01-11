import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInService } from '../log-in/log-in.service';
import { Contact } from '../contacts/contact.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private logInService: LogInService, private route:ActivatedRoute) {
    this.profileForm = this.fb.group({
      id: '',
      icon: [''],
      personalContact: [false],
      firstName: '',
      lastName: '',
      dateOfBirth: [null],
      favoritesRanking: [null],
      phones:  this.fb.group({
        phoneNumber:'',
        phoneType: '',
        preferred: false,
      }),
      address: this.fb.group({
        streetAddress: [''],
        city: [''],
        state: [''],
        postalCode: [''],
        addressType: ['']
      }),
      notes: ['']
    });
  }

  ngOnInit() {
    this.logInService.getUserProfile().subscribe({
      next: (profileForm) => {
        if (!profileForm) return
      }
    });
  }
  // ngOnInit() {
  //   const contactId = this.route.snapshot.params['id'];

  //   this.logInService.getUserProfile().subscribe({
  //     next: (profileForm) => {
  //       console.log(profileForm); // Log the retrieved data
  //       if (profileForm) {
  //         this.profileForm.patchValue(profileForm);
  //       }
  //     }
  //   });
  // }
  
}
