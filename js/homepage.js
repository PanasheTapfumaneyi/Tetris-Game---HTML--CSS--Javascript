const isUsersKeyCreated = localStorage.getItem('users');

if (!isUsersKeyCreated) {
  const users = [];
  localStorage.setItem('users', JSON.stringify(users));
}

let header = document.getElementById('header');

// Function to display the username in the header
function displayName() {
  let username = localStorage.getItem('username');
  if (localStorage.username != undefined)
    header.innerHTML = 'Welcome to Tetris, ' + username;
}

displayName();

// Function for logout button
function logoutBtn() {
  // Remove the current user from session storage
  sessionStorage.removeItem('loggedInUsr');
  // Redirect to the main page
  window.location.href = 'index.html';
}
