import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent {
     getContactsList(){
      var gridSection = document.getElementById("contact-container");
      gridSection? gridSection.style.display = "none":'';


     fetch('http://localhost:3000/getContacts',{
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
  .then(response => response.json())
  .then((data) => {
const table = document.getElementById("contact-table") as HTMLTableElement;
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
  table.appendChild(row);
  
  var listSection = document.getElementById("listSection");
  listSection? listSection.style.display = "true":'';


 }
})
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}



  displayContactsGrid(){
    
    var listSection = document.getElementById("listSection");
    listSection? listSection.style.display = "none":'';

      fetch('http://localhost:3000/getContacts',{
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  //display contacts as cards
 const container = document.getElementById("contact-container");
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

var gridSection = document.getElementById("contact-container");
gridSection? gridSection.style.display = "true":'';
}).catch(error => {
    console.error('Error fetching data:', error);
  });
}


 searchContact() {
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
   };
    
 
   
  }
}

 

    

