const apiUrl = "https://randomuser.me/api/?results=20&";
const listElm = document.getElementById("list");
let userList = [];

const fetchUsers = async (query) => {
  fetch(apiUrl + query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      userList = data.results;
      display(data.results);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchUsers();

const display = (users) => {
  console.log(users);
  let str = "";

  users?.map((user, i) => {
    str += `

    <div class="card shadow" style="width: 18rem">
    <img
      src="${user.picture.large}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${user.name.title} ${user.name.first} ${
      user.name.last
    }</h5>
      <p class="card-text">
        
      <ul class="list-unstyled">
      <li><i class="fa-solid fa-phone"></i> ${user.phone}</li>
      <li><i class="fa-solid fa-envelope"></i> ${user.email}</li>
      <li> <i class="fa-solid fa-calendar-days"></i> ${user.dob.date.substr(
        0,
        10
      )}</li>
     
      <li><i class="fa-solid fa-map-pin"></i> ${user.location.country}</li>
      <li><i class="fa-solid fa-map-pin"></i> ${user.location.postcode}</li>
      
      <li><i class="fa-solid fa-map-pin"></i> ${
        user.location.street.number
      }</li>
      
      
      </ul>

      </p>
      </div>
  </div>`;
  });

  listElm.innerHTML = str;
  document.getElementById("user-count").innerText = users.length;
};

const handleOnSearch = (e) => {
  const value = e.value;

  const filterdUser = userList.filter((user) => {
    const name = user.name.first + user.name.last;
    return name.toLowerCase().includes(value.toLowerCase());
  });

  display(filterdUser);
};

const handdleOnChange = (e) => {
  const value = e.value;
  const query = "gender=" + value;

  fetchUsers(query);
};
