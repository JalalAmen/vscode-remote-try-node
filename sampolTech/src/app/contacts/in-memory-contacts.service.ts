import { InMemoryDbService, RequestInfoUtilities, STATUS } from 'angular-in-memory-web-api';
import { Authentications, Contact, IUserCredentials } from './contact.model';
import { throwError } from 'rxjs';

export class InMemoryContactsApi implements InMemoryDbService {

 
  
  private requestUtils!: RequestInfoUtilities;
  private utils: RequestInfoUtilities = this.requestUtils;
  
  
  
    
 

  responseInterceptor(responseOptions: any, requestInfo: any): any {
    
    if (this.utils.getJsonBody(requestInfo.req) && requestInfo.url.includes('users') && requestInfo.req.method === 'POST') {
      const credentials: IUserCredentials = this.utils.getJsonBody(requestInfo.req);

      const user = this.authenticate(credentials);

      if (user) {
        return this.utils.createResponse$(() => ({
          body: user,
          status: responseOptions.status
        }));
      } else {
        return throwError({ status: 401, statusText: 'Unauthorized' });
      }
    }

    return responseOptions;
  }

  private authenticate(credentials: IUserCredentials): Authentications | null {
    // Simulate authentication logic using your own data
    // For example, check if the credentials match a user in your in-memory array
    const users: Authentications[] = [
      {
        id: 1,
        profileId: '5CehW',
        email: 'dpercival@yahoo.com',
        password: 'percival1234',
      },
      {
        id: 2,
        profileId: 'A6rwe',
        email: 'fmortimer@yahoo.com',
        password: 'mortimer1234',
      }
    ];

    return users.find(user => user.email === credentials.email && user.password === credentials.password) || null;
  }

  createDb() {
    let contacts: Contact[] = [
      {
        id: '5CehW',
        icon: '',
        personalContact: false,
        firstName: 'Percival', 
        lastName: 'Doodleplumb',
        dateOfBirth: new Date('1994/05/05'),
        favoritesRanking: 0,
        phones: [{ phoneNumber: '555-765-4321', phoneType: 'mobile', preferred: false }],
        address: {
          streetAddress: '777 Whimsy Lane',
          city: 'Gleeberg City',
          state: 'Colohoma',
          postalCode: 'A4321',
          addressType: 'home'
        },
        notes: ''
      },
      {
        id: 'A6rwe',
        icon: '',
        personalContact: false,
        firstName: 'Mortimer',
        lastName: 'Flungford',
        dateOfBirth: new Date('1988/10/05'),
        favoritesRanking: 0,
        phones: [{ phoneNumber: '555-877-5678', phoneType: 'mobile', preferred: false }],
        address: {
          streetAddress: '543 Lullaby Lane',
          city: 'Sleepytown',
          state: 'Ulaska',
          postalCode: 'F2231',
          addressType: 'other'
        },
        notes: ''
      },
      {
        id: '3bNGA',
        icon: 'person-04.png',
        personalContact: false,
        firstName: 'Wanda',
        lastName: 'Giggleworth',
        dateOfBirth: new Date('1986/11/08'),
        favoritesRanking: 1,
        phones: [
          { phoneNumber: '555-123-4567', phoneType: 'mobile', preferred: false },
          { phoneNumber: '555-321-7890', phoneType: 'work', preferred: false }
        ],
        address: {
          streetAddress: '123 Merriment Avenue',
          city: 'Dorado City',
          state: 'Mezona',
          postalCode: 'Z2345',
          addressType: 'work'
        },
        notes: ''
      },
    ]
    
    
    return { contacts }
  }
}