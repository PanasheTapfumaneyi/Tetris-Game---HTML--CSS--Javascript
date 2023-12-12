/* 

lines 9-14 are very important they check if the users array has been
created in the localstorage if not it will create it

if the user array does not exist you will get errors

*/
const isUsersKeyCreated = localStorage.getItem('users');

if (!isUsersKeyCreated) {
  const users = [];
  localStorage.setItem('users', JSON.stringify(users));
}

function isLoggedIn() {
  return sessionStorage.getItem('username') !== null;
}

user = sessionStorage.getItem('loggedInUsr');

function checkLogIn() {
  if (user == null) {
    window.location.href = 'login.html';
  } else {
    window.location.href = 'homepage.html';
  }
}

function checkSignUp() {
  if (user == null) {
    window.location.href = 'signup.html';
  } else {
    window.location.href = 'homepage.html';
  }
}
