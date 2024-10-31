//SELECTING AAL ELE,ENTS
let fristname = document.querySelector("#firstName");

let lastname = document.querySelector("#lastName");

let password = document.querySelector("#Password");

let confirmPassword = document.querySelector("#confirmPasword");

let email = document.querySelector("#Email");

let phone = document.querySelector("#Phone");

let form = document.querySelector("#ragister");

let helper = document.querySelector("#helper");

let confirmHelper = document.querySelector("#confirmHelper");

let successalert = document.querySelector("#successAlert");

let dangeralert = document.querySelector("#dangerAlert");
// console.log(dangeralert);

let table = document.querySelector("#userTable tbody");

let newID = 1;

GenerateID();

document.addEventListener("DOMContentLoaded", getUsers);

table.addEventListener("click", removeRow);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    checkEmptyField(fristname) &&
    checkEmptyField(lastname) &&
    checkEmptyField(password) &&
    checkEmptyField(confirmPassword) &&
    checkEmptyField(email) &&
    checkEmptyField(phone)
  ) {
    if (!checkPasswordLength()) {
      checkPasswordLength();

      return;
    }

    if (!checkConfirmPasword()) {
      checkConfirmPasword();

      return;
    }

    registerNewUser(fristname, lastname, password, email, phone);

    successalert.textContent = "Thank you Succesfully Registered....";
    successalert.classList.add("d-block");

    form.reset();
  } else {
    checkEmptyField(fristname);
    checkEmptyField(lastname);
    checkEmptyField(password);
    checkEmptyField(confirmPassword);
    checkEmptyField(email);
    checkEmptyField(phone);
  }
});

// check empty field fuction

function checkEmptyField(field) {
  if (field.value == "") {

    field.classList.add('border', 'border-danger');
    dangeralert.textContent = 'All fields Must not Empty';
    dangeralert.classList.add('d-block')
    return;
  }else {

    field.classList.remove("border-danger");

    dangeralert.classList.remove("d-block");

    return true;
  }
}

//check password legth

function checkPasswordLength() {
  if (password.value.length < 6) {
    password.classList.add("border-danger");

    helper.textContent = "Password at lleast 6 charecter";

    helper.classList.add("text-danger");

    return;
  } else {
    password.classList.remove("border-danger");
    helper.textContent = "";

    return true;
  }
}

//  check confirm password

function checkConfirmPasword() {
  if (confirmPassword.value != Password.value) {
    password.classList.add("border-danger");

    confirmHelper.textContent = "Password Must Be Same";

    confirmHelper.classList.add("text-danger");

    return;
  } else {
    password.classList.remove("border-danger");

    confirmHelper.textContent = "";

    return true;
  }
}

// register fucntion

function registerNewUser(fristname, lastName, password, email, phone) {
  let user = `<tr><td>${newID}</td> 
              <td> ${fristname.value}</td>
              <td> ${lastName.value}</td>
              <td> ${password.value}</td>
              <td> ${email.value}</td>
              <td> ${phone.value}</td>
              <td><button class=" btn btn-danger "><i class=" ba ba-trash "></i>Remove</button></td>
            </tr>`;

  table.innerHTML += user;

  saveToLocalStorage(user);
}

function saveToLocalStorage(user) {
  let usr;

  if (localStorage.getItem("user") === null) {
    usr = [];
  } else {
    usr = JSON.parse(localStorage.getItem("user"));
  }

  usr.push(user);

  localStorage.setItem("user", JSON.stringify(usr));
}

function getUsers() {
  let usr;

  if (localStorage.getItem("user") === null) {
    usr = [];
  } else {
    usr = JSON.parse(localStorage.getItem("user"));
  }

  usr.forEach((Element) => {
    table.innerHTML += Element;
  });
}

function GenerateID() {
  let usr;
  if (localStorage.getItem("user") === null) {
    usr = [];

    newID = 1;
  } else {
    usr = JSON.parse(localStorage.getItem("user"));
  }

  usr.forEach(function (users) {
    newID = users.substring(8, users.indexOf("</td>"));

    newID++;
  });
}

function removeRow(event) {
  // console.log(event.target.classList[0]);

  if (event.target.classList[0] == "btn") {
    event.target.parentElement.parentElement.remove();

    removeUserFromList(
      event.target.parentElement.parentElement.firstChild.innerHTML
    );
  }
}

function removeUserFromList(user) {
  let usr;

  if (localStorage.getItem("user") === null) {
    usr = [];
  } else {
    usr = JSON.parse(localStorage.getItem("user"));
  }

  usr.forEach(function (users, index) {
    if (users.substring(8, users.indexOf("</td>")) == user) {
      usr.splice(index, 1);
    }
  });
  localStorage.setItem("user", JSON.stringify(usr));
}
