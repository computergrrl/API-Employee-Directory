 // const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
 // email, location, phone, dob &noinfo &nat=US`;

 const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
 const grid = document.querySelector(".main-grid");

 fetch(urlAPI)
   .then(response => response.json())
   .then(response => response.results)
   // .then(console.log(response));
   // .then(response => console.log(response))
   .then(loopOverUsers);

 function loopOverUsers(data) {
   data.forEach((user, index) => {
     grid.innerHTML += `
      <div class="card">
      <img src="${user.picture.large}"> 
      <div class="user-info">
      <h2>${user.name.first} ${user.name.last}</h2>
      <p class="email">${user.email}</p>
      <p class="city">${user.location.city}</p>
      </div>
      </div>
      
      `
   })
 };