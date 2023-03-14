import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactsDetailsComponent } from './contacts-details/contacts-details.component';
import { SearchContactComponent } from './search-contact/search-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AddContactComponent,
    ContactsDetailsComponent,
    SearchContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
 
  
})
export class AppModule { }
