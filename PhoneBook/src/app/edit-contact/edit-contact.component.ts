import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  handleUpdateContact(this: HTMLButtonElement): void {  
    const contact: (string | null)[]=[];
    const row = this.closest("tr");
    if (row) {
      const cells = row.querySelectorAll("td");
      cells.forEach((cell: HTMLTableDataCellElement) =>contact.push(cell.textContent));
      
    }
    console.log(contact[4]);
  
      const firstNameInput = document.getElementById("firstName");
      const firstName=firstNameInput?firstNameInput.textContent :"";
  
      const lastNameInput = document.getElementById("lastName");
      const lastName=lastNameInput?lastNameInput.textContent :"";
  
      
      const phoneNumberInput = document.getElementById("phoneNumber");
      const phoneNumber=phoneNumberInput?phoneNumberInput.textContent :"";
  
      const emailInput = document.getElementById("email");
      const email=emailInput?emailInput.textContent :"";
  
      const addressInput = document.getElementById("address");
      const address=addressInput?addressInput.textContent :"";
  
      const imageNameInput = document.getElementById("imageName");
      const imageName=imageNameInput?imageNameInput.textContent :"";
  
      const contactDetails={FirstName:firstName,LastName:lastName,Email:email,PhoneNumber:phoneNumber,ContactImage:imageName,PhysicalAddress:address}
      console.log(contactDetails);
    //   fetch('http://localhost:3000/contacts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(contactDetails)
    // })
    // .then(response => response.json())
    // .then((data) => {
    //   console.log("Contact added succefully:"+data);
      
    // const addContactMessage=document.getElementById("addContactMessage") as HTMLElement;
    // addContactMessage.innerHTML="Contact added succefully";  
      
    // })
  }
}