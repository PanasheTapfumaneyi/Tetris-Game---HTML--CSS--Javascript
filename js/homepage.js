let header = document.getElementById("header");

function displayName() {
  let username = localStorage.getItem('username')
  if(localStorage.username != undefined)
  header.innerHTML = "Welcome to Tetris, " + username;
}

displayName();

function logoutBtn(){
  sessionStorage.removeItem('loggedInUsr');
  window.location.href = "index.html";
}