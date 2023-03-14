import { Component } from '@angular/core';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent {
      openAddContact(){
       
          const myAddContactModal=document.getElementById("myAddContactModal");
          if(myAddContactModal)myAddContactModal.style.display = "block";
        
    }  
   updateContact = () => {
  
  const firstNameInput = document.getElementById("firstName") as HTMLInputElement;
  const firstName=firstNameInput?firstNameInput.value:"";

  const lastNameInput = document.getElementById("lastName") as HTMLInputElement;
  const lastName=lastNameInput?lastNameInput.value:"";

  const phoneNumberInput = document.getElementById("phoneNumber") as HTMLInputElement;
  const phoneNumber=phoneNumberInput?phoneNumberInput.value:"";

  const emailInput = document.getElementById("email") as HTMLInputElement; 
  const email=emailInput?emailInput.value:"";

  const addressInput = document.getElementById("address") as HTMLInputElement;
  const address=addressInput?addressInput.value:"";

  const imageNameInput = document.getElementById("image") as HTMLInputElement;
  const imageName=imageNameInput?imageNameInput.value:"";
  const updateData={FirstName:firstName,LastName:lastName,Email:email,PhoneNumber:phoneNumber,ContactImage:imageName,PhysicalAddress:address}
  console.log(updateData);
  fetch(`http://localhost:3000/UpdateContacts?PhoneNumber=${phoneNumber}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const editConfirmMessage='<h4>Contact Updated successfully</h4>';
      const editMessage=document.getElementById("editMessage");
      editMessage?editMessage.innerHTML=editConfirmMessage:"";
      const contactDetailsComponent=new ContactsDetailsComponent();
      contactDetailsComponent.getContactsList();
    })
    .catch((err) => console.error(err));
};


   deleteSelected(){  
    const table = document.getElementById("tableData") as HTMLTableElement;
    const rows = table.getElementsByTagName("tr") as HTMLCollectionOf<HTMLTableRowElement> | HTMLTableRowElement[];
    const checkedRows: string[][] = [];
  
    for (let i = 0; i < rows.length; i++) {
      const checkbox = rows[i].querySelector<HTMLInputElement>('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const cells = rows[i].getElementsByTagName("td");
        const rowContent: string[] = [];
        rowContent?rowContent.push(cells[4].textContent as string):"";
        
        checkedRows.push(rowContent);
      }
    }
  
    
    if (checkedRows.length > 0) {
      alert(`Checked rows:\n${JSON.stringify(checkedRows)}`);
      console.log("cheched "+ checkedRows);      
  fetch(`http://localhost:3000/deleteContact?phoneNumber=${checkedRows}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      console.log("Contact deleted successfully");
      const deleteConfirmMessage=`<h4>${checkedRows} Contact deleted successfully</h4>`;
      const deleteMessage=document.getElementById("deleteMessage");
      deleteMessage?deleteMessage.innerHTML=deleteConfirmMessage:"";
      const contactDetailsComponent=new ContactsDetailsComponent();
  contactDetailsComponent.getContactsList();
    })
    .catch((error) => {
      console.error(error);
    });
  
    openDeleteModal();

    } else {
      alert("No rows checked.");
    }
  }





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
    contactlistSection.innerHTML="";
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
 checkbox.innerHTML=`<input type="checkbox" class="form-control" value="selected" id="checkboxBtn"/>`

 // Append the checkbox to the select cell
 

  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = contact.FirstName;

  const lastNameCell = document.createElement("td");
  lastNameCell.textContent = contact.LastName;

  const emailCell = document.createElement("td");
  emailCell.textContent = contact.Email;

  const phoneCell = document.createElement("td");
  phoneCell.textContent = contact.PhoneNumber.toString();
  phoneCell.style.color="skyblue";
  phoneCell.style.fontWeight="bold";  
  phoneCell.style.fontSize="25px";  
  phoneCell.style.backgroundColor="grey";

  const imageCell = document.createElement("td");
  imageCell.textContent = contact.ContactImage;

  const addressCell = document.createElement("td");
  addressCell.textContent = contact.PhysicalAddress;

  const viewBtn = document.createElement("td");
  viewBtn.addEventListener("click", handleViewClick);
  viewBtn.innerHTML = `<button class="form-control btn-info" id="viewBtn" (click)="handleViewClick()">View</button>`;

  const deleteBtn = document.createElement("td");
  deleteBtn.innerHTML = `<button class="form-control btn-danger">delete</button>`;
  if(deleteBtn)deleteBtn.addEventListener("click",handleDeleteContact);

  const editBtn = document.createElement("td");
  editBtn.innerHTML = `<button class="form-control btn-success" >Edit</button>`;
  editBtn?editBtn.addEventListener("click",editContact):"";

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
 contactCard+=`    <div class="col-4">
                      <div class="card ">                      
                      <div class="card-header text-center">
                            <image src="../favicon.ico"/>                          
                      <h5 class="text-info"><b>${contact.FirstName} ${contact.LastName}</b></h5>
                      </div>
                      <div class="card-body">
                      <h8>Email:${contact.Email}</h8>
                      <h8 class="text-info">Phone:${contact.PhoneNumber}</h8>
                      <h8>Address:${contact.PhysicalAddress}</h8>
                      </div>
                      </div>
                    </div>
                `});
const gridContainer = document.getElementById("contact-gridContainer") as HTMLElement;
// Append each card element to the gridContainer element in the DOM
if(gridContainer)gridContainer.innerHTML=contactCard;
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
 checkbox.innerHTML=`<input type="checkbox"  class="form-control" value="selected" id="checkboxBtn"/>`

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
  viewBtn.addEventListener("click", handleViewClick);
  viewBtn.innerHTML = `<button class="form-control btn-info" id="viewBtn" (click)="handleViewClick()" >View</button>`;

  const searchDeleteBtn = document.createElement("td");
  searchDeleteBtn.innerHTML = `<button class="form-control btn-danger" id="searchDeleteBtn">delete</button>`;
  if(searchDeleteBtn)searchDeleteBtn.addEventListener("click",handleDeleteContact);


  const searchEditBtn = document.createElement("td");
  searchEditBtn.innerHTML = `<button class="form-control btn-success" id="searchEditBtn"  >Edit</button>`;
  searchEditBtn.addEventListener("click",editContact);
  

  // Append the cells to the row element
  row.appendChild(checkbox);
  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(imageCell);
  row.appendChild(addressCell);
  row.appendChild(viewBtn);
  row.appendChild(searchEditBtn);
  row.appendChild(searchDeleteBtn);

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

closeDeleteModal() {
  const myModal=document.getElementById("myDeleteModal");
  if(myModal)myModal.style.display = "none";
}

closeEditModal() {
  const myModal=document.getElementById("editModal");
  if(myModal)myModal.style.display = "none";
}

}
function handleViewClick(this: HTMLButtonElement): void {  
  const contact: (string | null)[]=[];
  const row = this.closest("tr");
  if (row) {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell: HTMLTableDataCellElement) =>contact.push(cell.textContent));
    
  }
  console.log(contact);
  const modalContent=document.getElementById("modalContent");
  const content=`<ul><li class="text-info"><h4>${contact[1]} ${contact[2]}</4></li><li>${contact[3]}</li><li>${contact[4]}</li><li>${contact[6]}</li></ul>`
  if(modalContent)modalContent.innerHTML=content;
  openModal();
}




function openModal() {
  const myModal=document.getElementById("myModal");
  if(myModal)myModal.style.display = "block";
}

function openDeleteModal() {
  const myModal=document.getElementById("myDeleteModal");
  if(myModal)myModal.style.display = "block";
}
function openEditModal() {
  const myModal=document.getElementById("editModal");
  if(myModal)myModal.style.display = "block";
}

function handleDeleteContact(this: HTMLButtonElement): void {  
  const contact: (string | null)[]=[];
  const row = this.closest("tr");
  if (row) {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell: HTMLTableDataCellElement) =>contact.push(cell.textContent));
    
  }

  fetch(`http://localhost:3000/deleteContact?phoneNumber=${contact[4]}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      console.log("Contact deleted successfully");
      const deleteConfirmMessage='<h4>Contact deleted successfully</h4>';
      const deleteMessage=document.getElementById("deleteMessage");
      deleteMessage?deleteMessage.innerHTML=deleteConfirmMessage:"";
      const contactDetailsComponent=new ContactsDetailsComponent();
  contactDetailsComponent.getContactsList();
    })
    .catch((error) => {
      console.error(error);
    });
  
    openDeleteModal();
    
}




function editContact(this: HTMLButtonElement): void {  
  const contact: (string | null)[]=[];
  const row = this.closest("tr");
  if (row) {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell: HTMLTableDataCellElement) =>contact.push(cell.textContent));
    
  }
console.log(contact[4]);
  fetch(`http://localhost:3000/searchContacts?phoneNumber=${contact[4]}`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      console.log("Contact selected successfully");
      const firstName=document.getElementById("firstName") as HTMLInputElement;
      firstName?firstName.value=res[0].FirstName:"";

      const lastName=document.getElementById("lastName") as HTMLInputElement;
      lastName?lastName.value=res[0].LastName:"";

      const email=document.getElementById("email") as HTMLInputElement;
      email?email.value=res[0].Email:"";

      const PhoneNumber=document.getElementById("phoneNumber") as HTMLInputElement;
      PhoneNumber?PhoneNumber.value=res[0].PhoneNumber:"";
      

      

      const PhysicalAddress=document.getElementById("address") as HTMLInputElement;
      PhysicalAddress?PhysicalAddress.value=res[0].PhysicalAddress:"";

      const contactDetailsComponent=new ContactsDetailsComponent();
  contactDetailsComponent.getContactsList();
      

    })
    .catch((error) => {
      console.error(error);
    });
  
    openEditModal();
    
}

