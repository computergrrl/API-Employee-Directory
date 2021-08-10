 
 let employees = [];
 const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
 const overlay = document.querySelector(".overlay");
 const gridContainer = document.querySelector(".grid-container");
 const modalContainer = document.querySelector(".modal-content");
 const modalClose = document.querySelector(".modal-close");

 fetch(urlAPI)
   .then(res => res.json())
   .then(res => res.results)
   .then(data => res.results)
   //console.log(data);
   .then(displayEmployees)
  .catch(err => console.log(err));


 function displayEmployees(employeeData) {
   employees = employeeData;
   // store the employee HTML as we create it
   let employeeHTML = '';
   // loop through each employee and create HTML markup
   employees.forEach((employee, index) => {
     
     employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${employee.picture.large}" />
    <div class="text-container">
    <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
    <p class="email">${employee.email}</p>
    <p class="address">${employee.location.city}</p>
    </div>
    </div>
    `
   });
   gridContainer.innerHTML = employeeHTML;
 }

 function displayModal(index) {
  
   let { name, dob, phone, email, location, picture } = employees[index];

   let date = new Date(dob.date);
   let month = date.getMonth()+1;
   month < 10 ? month = '0' + month: month = month;

   const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${location.city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${location.street.number} ${location.street.name} ${location.city}, ${location.state} ${location.postcode}</p>
        <p>Birthday:
        ${month}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
      <button class="prev" onclick="prevModal(${index})"> < </button>
      <button class="next" onclick="nextModal(${index})"> > </button>`;
      

     

   overlay.classList.remove("hidden");
   modalContainer.innerHTML = modalHTML;

 }



  /**************** SEARCH FUNCTION ********************/

const search = document.querySelector('#search');

const handleSearch = (e) => {
  
  const cards = document.querySelectorAll('.card .name');
  const searchTerm = e.target.value.toLowerCase();

  
    cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const box = card.parentElement.parentElement;
    
   
    if(text.includes(searchTerm)) {
      box.style.display = "flex";
    } else {
      box.style.display = "none";  
    }
   });

 }

search.addEventListener('keyup', handleSearch);

/************* Functions for Previous and Next Modal  **************/


function prevModal(index) {
  index -=1;
  if (index > -1) {
    displayModal(index ) 
  } else {
    displayModal(11);
    }
}

function nextModal(index) {
     index +=1;
  if (index < 12) {
    displayModal(index ) 
  } else {
    displayModal(0);
    }

}




/*********** Add Event Listener to Grid for Modal Popup  ***********/
 gridContainer.addEventListener('click', e => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {
  /* select the card element based on its proximity to actual element
  clicked*/
  const card = e.target.closest(".card");
  const index = card.getAttribute('data-index');
  displayModal(index);
  }
  });

  modalClose.addEventListener("click", () => {
     overlay.classList.add("hidden");
  });

