 
  // const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
  // email, location, phone, dob &noinfo &nat=US`;

  const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
  
  fetch(urlAPI)
  .then(response => response.json )
  .then(response => response.results)
  .then(console.log(response));