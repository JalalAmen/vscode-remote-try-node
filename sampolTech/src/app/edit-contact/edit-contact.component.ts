import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { PhoneTypeValues, AddressTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validators';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs';


@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  phoneTypes = PhoneTypeValues;
  addressTypes= AddressTypeValues;

  contactForm = this.fb.nonNullable.group({
    id:'',
    icon:'',
    personalContact: false,
    firstName : ['', [Validators.required, Validators.minLength(3)]],
    lastName : ['', [Validators.required, Validators.minLength(3)]],
    dateOfBirth :<Date | null> null,
    favoritesRanking : <number | null> null,
    phones: this.fb.array([this.createPhoneForm()]),
    
    address: this.fb.nonNullable.group({

    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    addressType: ['', Validators.required]
    }),
    notes:['',restrictedWords(['foo', 'fuck']) ],
  
  });


  constructor( private route: ActivatedRoute, private contactService:ContactsService, private router:Router, private fb: FormBuilder) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) {
      this.subscribeToAddressChanges();
      return;

    } 
      
    this.contactService.getContact(contactId).subscribe((contact)=>
    {
      if (!contact) return;

      for(let i = 1; i< contact.phones.length;i++){
        this.addPhoneNumber()
      }

      this.contactForm.setValue(contact);
      this.subscribeToAddressChanges();
      
    }

    )
  }
  addPhoneNumber(){
    this.contactForm.controls.phones.push(this.createPhoneForm())
  }
  stringifyCompare(a:any, b:any){
    return JSON.stringify(a)===JSON.stringify(b);

  }

  createPhoneForm(){
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber:'',
      phoneType: '',
      preferred: false,
    });

    
    phoneGroup.controls.preferred.valueChanges
    .pipe(distinctUntilChanged(this.stringifyCompare))
    .subscribe(value => {
      if(value)
        phoneGroup.controls.phoneNumber.addValidators([Validators.required])
      else
        phoneGroup.controls.phoneNumber.removeValidators([Validators.required])

      phoneGroup.controls.phoneNumber.updateValueAndValidity();
    })
    
    return phoneGroup;
  }

  subscribeToAddressChanges(){
    const addressGroup = this.contactForm.controls.address;
    addressGroup.valueChanges
    .pipe(distinctUntilChanged(this.stringifyCompare))
    .subscribe(()=>{
      for (const controlName in addressGroup.controls){
        addressGroup.get(controlName)?.removeValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity();
      }
    });
    addressGroup.valueChanges
    .pipe(debounceTime(20000),distinctUntilChanged(this.stringifyCompare))
    .subscribe(()=>{
      for (const controlName in addressGroup.controls){
        addressGroup.get(controlName)?.addValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity();
      }
    });
  }

  saveContact() {
    
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next:() => this.router.navigate(['/contacts'])

    })

  }
}
