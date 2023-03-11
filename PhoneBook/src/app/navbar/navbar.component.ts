import { Component } from '@angular/core';
import { ContactsDetailsComponent } from '../contacts-details/contacts-details.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

}


const contactDetailsComponent=new ContactsDetailsComponent();
contactDetailsComponent.getContactsList();