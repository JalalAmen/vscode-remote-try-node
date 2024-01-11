import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Authentications, Contact, IUserCredentials } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private user: BehaviorSubject<Authentications | null>;
  profile: Contact | null = null;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<Authentications | null>(null);
  }

  getUserProfile(): Observable<Contact | null> {
    const userProfile = this.profile ?? { id: '', icon: '', personalContact: false, firstName: '', lastName: '', dateOfBirth: null, favoritesRanking: null, phones: [], address: { streetAddress: '', city: '', state: '', postalCode: '', addressType: '' }, notes: '' };
    console.log(this.user.value);
    if (this.user.value) {
      userProfile.id = String(this.user.value.profileId);
      return new Observable<Contact | null>(observer => {
        observer.next(userProfile);
        observer.complete();
        
      });
    } else {
     
      return new Observable<Contact | null>(observer => {
        observer.next(null);
        observer.complete();
      });
    }
  }
  signIn(credentials: IUserCredentials): Observable<Authentications> {
    
    
    return this.http
      .post<Authentications>('/api/sign-in', credentials)
      .pipe(map((user: Authentications) => {
        console.log(user)
        this.user.next(user);
        return user;
      }));
  }

  

 
}
