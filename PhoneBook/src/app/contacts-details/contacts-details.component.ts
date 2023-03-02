import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent {
     getContactsList(){
     fetch('http://localhost:3000/getContacts',{
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
  .then(response => response.json())
  .then((data) => {
    const listSection=document.getElementById("listSection")as HTMLElement;;
    listSection.style.display="block";
    const container = document.getElementById("contact-container") as HTMLElement; 
    container.style.display="none";
// Loop through each contact object in the array
for (let i = 0; i < data.length; i++) {
  const contact = data[i];

  // Create a new row element for the contact
  const row = document.createElement("tr");

 // Create a new checkbox element and set its type to "checkbox"
 const checkbox = document.createElement("input");
 checkbox.type = "checkbox";

 // Append the checkbox to the select cell
 

  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = contact.FirstName;

  const lastNameCell = document.createElement("td");
  lastNameCell.textContent = contact.LastName;

  const emailCell = document.createElement("td");
  emailCell.textContent = contact.Email;

  const phoneCell = document.createElement("td");
  phoneCell.textContent = contact.PhoneNumber.toString();

  const imageCell = document.createElement("td");
  imageCell.textContent = contact.ContactImage;

  const addressCell = document.createElement("td");
  addressCell.textContent = contact.PhysicalAddress;

  // Append the cells to the row element
  row.appendChild(checkbox);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(imageCell);
  row.appendChild(addressCell);

  // Append the row element to the table element
  listSection.appendChild(row);
 }
})
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}



  displayContactsGrid(){

      fetch('http://localhost:3000/getContacts',{
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
  .then(response => response.json())
  .then((data) => {
  //display contacts as cards
 const container = document.getElementById("contact-container") as HTMLElement;
 container.style.display="block"; 
const listSection = document.getElementById("listSection") as HTMLTableElement;
 listSection.style.display="none";
      
let  contactCard='';
data.forEach((contact: {
  Email: any;
  PhoneNumber: RegExp;
  PhysicalAddress: any; 
  FirstName: any; 
  LastName: any; 
})=>{
 contactCard+=`<div class="card m-1">
                        <div class="card-header text-center">
                              <image src="../favicon.ico"/>
                        </div>
                        <div class="card-body">
                        <h6>Name:${contact.FirstName}${contact.LastName}</h6>
                        <h6>Email:${contact.Email}</h6>
                        <h6>Phone:${contact.PhoneNumber}</h6>
                        <h6>Address:${contact.PhysicalAddress}</h6>
                        </div>
                    </div>`});
// Append each card element to the container element in the DOM
if(container)container.innerHTML=contactCard;
}).catch(error => {
    console.error('Error fetching data:', error);
  });
}


 searchContact() {
  const table = document.getElementById("listSection") as HTMLTableElement;
  table.style.display="none";
  
 const container = document.getElementById("contact-container") as HTMLElement;
 container.style.display="none"; 

  const searchInputValue = document.getElementById("searchContactInput") as HTMLInputElement;
  if (searchInputValue) {
    const phoneNumber =  searchInputValue.value
    const url = `http://localhost:3000/searchContacts?phoneNumber=${phoneNumber}`;
    console.log(url);
    fetch(url, {
      method: 'get'
    })
      .then(response => response.json())
      .then((data) => {
        console.log('Response:', data);
const searchResultsSection=document.getElementById("searchResultsSection");
searchResultsSection? searchResultsSection.style.display="block":"";
const searchResultsTable = document.getElementById("searchResultsTable") as HTMLTableElement;
searchResultsTable.innerHTML='';
// Loop through each contact object in the array
for (let i = 0; i < data.length; i++) {
  const contact = data[i];

  // Create a new row element for the contact
  const row = document.createElement("tr");

 // Create a new checkbox element and set its type to "checkbox"
 const checkbox = document.createElement("input");
 checkbox.type = "checkbox";

 // Append the checkbox to the select cell
 

  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = contact.FirstName;

  const lastNameCell = document.createElement("td");
  lastNameCell.textContent = contact.LastName;

  const emailCell = document.createElement("td");
  emailCell.textContent = contact.Email;

  const phoneCell = document.createElement("td");
  phoneCell.textContent = contact.PhoneNumber.toString();

  const imageCell = document.createElement("td");
  imageCell.textContent = contact.ContactImage;

  const addressCell = document.createElement("td");
  addressCell.textContent = contact.PhysicalAddress;

  // Append the cells to the row element
  row.appendChild(checkbox);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(imageCell);
  row.appendChild(addressCell);

  // Append the row element to the table element
  
  searchResultsTable.appendChild(row);
}
      })
      .catch(error => {
        console.error('Error:', error);
      });
   };
    
 
   
  }
}

 

    

