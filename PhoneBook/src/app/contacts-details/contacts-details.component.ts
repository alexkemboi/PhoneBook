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
    const listSection=document.getElementById("listSection")as HTMLElement;
    listSection.style.display="block";
    const contactlistSection=document.getElementById("contact-table")as HTMLTableElement;
    const container = document.getElementById("contact-container") as HTMLElement; 
    container.style.display="none";
    const searchResultsSection=document.getElementById("searchResultsSection") as HTMLElement;
    searchResultsSection.style.display="none";
// Loop through each contact object in the array
for (let i = 0; i < data.length; i++) {
  const contact = data[i];

  // Create a new row element for the contact
  const row = document.createElement("tr");
 // row.classList.add("table table-bordered table-striped table-hover");

 // Create a new checkbox element and set its type to "checkbox"
 const checkbox = document.createElement("td");
 checkbox.innerHTML=`<input type="checkbox" class="form-control" value="selected"/>`

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

  const viewBtn = document.createElement("td");
  viewBtn.addEventListener("click", handleClick);
  viewBtn.innerHTML = `<button class="form-control btn-info" id="viewBtn" (click)="handleClick()">View</button>`;

  const deleteBtn = document.createElement("td");
  deleteBtn.innerHTML = `<button class="form-control btn-danger">delete</button>`;
  if(deleteBtn)deleteBtn.addEventListener("click",handleDeleteContact);

  const editBtn = document.createElement("td");
  editBtn.innerHTML = `<button class="form-control btn-success">Edit</button>`;

  // Append the cells to the row element
  row.appendChild(checkbox);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(imageCell);
  row.appendChild(addressCell);
  row.appendChild(viewBtn);
  row.appendChild(editBtn);
  row.appendChild(deleteBtn);

  // Append the row element to the table element
  contactlistSection.appendChild(row);
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
 container.innerHTML=""; 
 container.style.display="block"; 
const listSection = document.getElementById("listSection") as HTMLTableElement;
 listSection.style.display="none";
 
 const searchResultsSection=document.getElementById("searchResultsSection") as HTMLElement;
 searchResultsSection.style.display="none";
      
let  contactCard='';
data.forEach((contact: {
  Email: any;
  PhoneNumber: RegExp;
  PhysicalAddress: any; 
  FirstName: any; 
  LastName: any; 
})=>{
 contactCard+=`    <div class="card m-3 col-6 m-auto">
                    <div class="card-header text-center bg-dark">
                          <image src="../favicon.ico"/>                          
                    <h3 class="text-info"><b>${contact.FirstName} ${contact.LastName}</b></h3>
                    </div>
                    <div class="card-body">
                    <h6>Email:${contact.Email}</h6>
                    <h6>Phone:${contact.PhoneNumber}</h6>
                    <h6>Address:${contact.PhysicalAddress}</h6>
                    </div>
                    <div class="card-footer">
                    <div class="row">
                    <div class="col-4"> <button class="form-control btn-danger">delete</button></div>
                    <div class="col-4"><button class="form-control btn-success">Edit</button></div>
                    <div class="col-4"><button class="form-control btn-info">View</button></div></div>
                   
                    
                    </div>
                    </div>
                `});
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
 const checkbox = document.createElement("td");
 checkbox.innerHTML=`<input type="checkbox"  class="form-control" value="selected"/>`

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

  const viewBtn = document.createElement("td");
  viewBtn.addEventListener("click", handleClick);
  viewBtn.innerHTML = `<button class="form-control btn-info" id="viewBtn" (click)="handleClick()" >View</button>`;

  const deleteBtn = document.createElement("td");
  deleteBtn.innerHTML = `<button class="form-control btn-danger" id="deleteBtn">delete</button>`;

  const editBtn = document.createElement("td");
  editBtn.innerHTML = `<button class="form-control btn-success" id="editBtn">Edit</button>`;

  // Append the cells to the row element
  row.appendChild(checkbox);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(imageCell);
  row.appendChild(addressCell);
  row.appendChild(viewBtn);
  row.appendChild(editBtn);
  row.appendChild(deleteBtn);

  // Append the row element to the table element
  
  searchResultsTable.appendChild(row);
 }
      })
      .catch(error => {
        console.error('Error:', error);
      });
   };   
 
}



closeModal() {
  const myModal=document.getElementById("myModal");
  if(myModal)myModal.style.display = "none";
}

}
function handleClick(this: HTMLButtonElement): void {  
  const contact: (string | null)[]=[];
  const row = this.closest("tr");
  if (row) {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell: HTMLTableDataCellElement) =>contact.push(cell.textContent));
    
  }
  console.log(contact);
  const modalContent=document.getElementById("modalContent");
  const content=`<ul><h4 class="text-info">Contact</h4><li>${contact[1]} ${contact[2]}</li><li>${contact[3]}</li><li>${contact[4]}</li><li>${contact[6]}</li></ul>`
  if(modalContent)modalContent.innerHTML=content;
  openModal();
}




function openModal() {
  const myModal=document.getElementById("myModal");
  if(myModal)myModal.style.display = "block";
}



function handleDeleteContact(this: HTMLButtonElement): void {  
  const contact: (string | null)[]=[];
  const row = this.closest("tr");
  if (row) {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell: HTMLTableDataCellElement) =>contact.push(cell.textContent));
    
  }
  console.log(contact[4]);

  fetch(`/deleteContact?phoneNumber=${contact[4]}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      console.log("Contact deleted successfully");
    })
    .catch((error) => {
      console.error(error);
    });
  

}
