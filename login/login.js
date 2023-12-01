let loggedUser = [];
let rememberCheckbox = document.getElementById('rememberCheckbox');
let email = document.getElementById('email');
let password = document.getElementById('password');


async function login() {
    await loadUsers();
    checkRememberMe();

    for (let i = 0; i < users.length; i++) {
      let userLogin = users[i];
      if (userLogin.email == getLoginValues()[0]) {
        if (userLogin.password == getLoginValues()[1]) {
        //   return "Anmeldung erfolgreich";
        console.log('anmeldung erfolgreich');
        loggedUser = users[i];
        await setItem('currentUser', loggedUser);
        window.location.href = "../summary/summary.html";
        return;
        } else {
        //   return "Falsches Passwort";
        console.log('falsches pw');
        return;
        }
      }
        
    }console.log('user not found');
        return;
}


// Remember me

function checkRememberMe() {
  if (rememberCheckbox.checked){
    // login daten in local storage speicher
    localStorage.setItem('rememberEmail', email.value);
    localStorage.setItem('rememberPassword', password.value);
  }
  else{
    localStorage.removeItem('rememberEmail');
    localStorage.removeItem('rememberPassword');
  }
}

// get login from local storage
function loadLogin() {
  if (localStorage.getItem("rememberEmail")) {
    email.value = localStorage.getItem("rememberEmail");
    password.value = localStorage.getItem("rememberPassword");
    rememberCheckbox.checked = true;
  }
  setTimeout(changeLogoColor, 500);
}

function changeLogoColor() {
  const logo = document.getElementById("logo");
  logo.style.backgroundImage = 'url("../Templates/img/join-dark.svg")';
}

async function guestLogin() {
  let guestUser = {
      username: 'Guest',
      email: 'gast@gast.com',
      password: 'gast',
  };
  loggedUser = guestUser;
  await setItem('currentUser', loggedUser);
  window.location.href = "../summary/summary.html";
}