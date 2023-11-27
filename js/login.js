// login.js file

let cookies = document.cookie;

function login(event){
  //Prevent page from refreshing after submission
  event.preventDefault();
  //Get username
  let username = document.getElementById("usernameInput").value.toUpperCase();

  //If account not found
  if(localStorage[username] === undefined){
    //Tell user that they do not have an account
    document.getElementById("loginFailure").innerHTML = "Username not found."
    return;
  }
  //If the user has an account
  else{
    let usrObj = JSON.parse(localStorage[username]);
    let password = document.getElementById("passwordInput").value;
    if(usrObj.password === password){
      // document.getElementById("loginPara").innerHTML = usrObj.username;
      sessionStorage.loggedInUsr = username;
      window.location.href = "homepage.html"
      return;
    }
    else{
      document.getElementById("loginFailure").innerHTML = "Incorrect Password"
    }
  }
}

window.onload = checklogin;

function checklogin() {
  if(sessionStorage.loggedInUsr !== null){
    let loggedInUser = sessionStorage.getItem('loggedInUser');
    //Get details of current user
    let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsr]);
  }
}

function togglePassword() {
  var x = document.getElementById("passwordInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
