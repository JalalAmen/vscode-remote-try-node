export interface Contact {
    id: string,
    icon:string,
    personalContact:boolean,
    firstName: string,
    lastName: string,
    dateOfBirth: Date | null,
    favoritesRanking: number | null,
    phones: Phone[],
    address: Address,
    notes:string,
  }

  
  export interface Phone {
    phoneNumber: string,
    phoneType: string,
    preferred: boolean,
  }
  
  export interface Address {
    streetAddress: string,
    city: string,
    state: string,
    postalCode: string,
    addressType: string,
  }
  export interface Authentications {
    id:number ;
    profileId:string;
    email: string;
    password: string;
  }
  export const PhoneTypeValues = [

    {title: 'Mobile', value: 'mobile'},
    {title: 'Work', value: 'work'},
    {title: 'Others', value: 'others'}

  ];
  export const AddressTypeValues =[

    {title: 'Home', value: 'home'},
    {title: 'Work', value: 'work'},
    {title: 'Others', value: 'others'}

  ]
  export interface IUserCredentials {
    email: string;
    password: string;
  }
  