// login.js file

import { getUser, isUserCreated } from './helpers/users.js';

let cookies = document.cookie;

const isUsersKeyCreated = localStorage.getItem('users');

if (!isUsersKeyCreated) {
  const users = [];
  localStorage.setItem('users', JSON.stringify(users));
}

// add onsubmit event lisitener to login form
document.forms[0].addEventListener('submit', login);

function login(event) {
  console.log('loggin');
  //Prevent page from refreshing after submission
  event.preventDefault();
  //Get username
  let username = document.getElementById('usernameInput').value;

  //If account not found
  if (!isUserCreated(username)) {
    //Tell user that they do not have an account
    document.getElementById('loginFailure').innerHTML = 'Username not found.';
    return;
  }
  //If the user has an account
  else {
    let usrObj = getUser(username);
    let password = document.getElementById('passwordInput').value;
    if (usrObj.password === password) {
      // document.getElementById("loginPara").innerHTML = usrObj.username;
      sessionStorage.loggedInUsr = username;
      window.location.href = 'homepage.html';
      return;
    } else {
      document.getElementById('loginFailure').innerHTML = 'Incorrect Password';
    }
  }
}

window.onload = checklogin;

function checklogin() {
  let username = document.getElementById('usernameInput').value;
  if (sessionStorage.loggedInUsr !== null) {
    let loggedInUser = sessionStorage.getItem('loggedInUser');
    //Get details of current user
    let usrObj = getUser(username);
  }
}

function togglePassword() {
  var x = document.getElementById('passwordInput');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}
