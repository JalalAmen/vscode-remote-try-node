import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, title: 'Home'},
  {
    path: 'contacts',
    component: ContactListComponent,
    title: 'Contacts'
  },
  {path: 'logIn', component:LogInComponent, title: 'LogIn'},
  {path: 'profile',component:ProfileComponent, title:'Profile'},
  {path: 'profile/:id',component:ProfileComponent, title:'Profile'},
  {
    path: 'contacts/edit/:id',
    component: EditContactComponent,
    title: 'Contacts - Edit'
  },
  {
    path: 'contacts/edit',
    component: EditContactComponent,
    title: 'Contacts - Edit'
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
