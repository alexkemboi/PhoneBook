import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContactsDetailsComponent } from '../contacts-details/contacts-details.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})



export class AddContactComponent {
  closeModal() {
    const myAddContactModal=document.getElementById("myAddContactModal");
    if(myAddContactModal)myAddContactModal.style.display = "none";
  }

  @ViewChild('firstName')
  firstNameInput!: ElementRef;
  @ViewChild('lastName')
  lastNameInput!: ElementRef;
  @ViewChild('phoneNumber')
  phoneNumberInput!: ElementRef;
  @ViewChild('email')
  emailInput!: ElementRef;
  @ViewChild('address')
  addressInput!: ElementRef;
  @ViewChild('imageName')
  imageNameInput!: ElementRef;
   addContact(){  
    const firstName = this.firstNameInput.nativeElement.value;
    const lastName = this.lastNameInput.nativeElement.value;
    const phoneNumber = this.phoneNumberInput.nativeElement.value;
    const email = this.emailInput.nativeElement.value;
    const address = this.addressInput.nativeElement.value;
    const imageName = this.imageNameInput.nativeElement.value;
    const contactDetails={FirstName:firstName,LastName:lastName,Email:email,PhoneNumber:phoneNumber,ContactImage:imageName,PhysicalAddress:address}
    
    fetch('http://localhost:3000/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactDetails)
  })
  .then(response => response.json())
  .then((data) => {
    console.log("Contact added succefully:"+data)
    
  const addContactMessage=document.getElementById("addContactMessage") as HTMLElement;
  addContactMessage.innerHTML="Contact added succefully";
  
    
  const contactDetailsComponent=new ContactsDetailsComponent();
  contactDetailsComponent.getContactsList();
  })
  .catch(error => console.error(error));




  }
  

}

