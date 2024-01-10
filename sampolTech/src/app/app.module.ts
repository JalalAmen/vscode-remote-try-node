import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { InMemoryContactsApi } from './contacts/in-memory-contacts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DateValueAccessorDirective } from './date-value-accessor/date-value-accessor.directive';
import { ProfileIconSelectorComponent } from './profile-icon-selector/profile-icon-selector.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    EditContactComponent,
    DateValueAccessorDirective,
    ProfileIconSelectorComponent,
    HomeComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
