/* 

these are function that will help use retrive and update
users from the local storage from any file

*/

// gets users array in local storage and returns them as a normal js array
export function getUsersFromLocacalStorage() {
  const users = JSON.parse(localStorage.getItem('users'));
  return users;
}

// adds a user to the array of users
export function saveUserInLocacalStorage(user) {
  // gets all the users from the local storage
  const users = getUsersFromLocacalStorage();

  // if we have an array of users
  if (users) {
    // add the user to the array
    users.push(user);

    // update and set the users array with the new users in the local storage
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// checks if a user has been created and returns true or false
export function isUserCreated(username) {
  const users = getUsersFromLocacalStorage();
  return users.some(function (user) {
    return user.username.toLowerCase() === username.toLowerCase();
  });
}

// returns a single user when given a the users username
export function getUser(username) {
  const users = getUsersFromLocacalStorage();
  return users.filter(function (user) {
    return user.username.toLowerCase() === username.toLowerCase();
  })[0];
}

// updates a users infromation e.g username, highscore, email with a new value
export function updateUserInformation(username, information, value) {
  const user = getUser(username);
  user[information] = value;

  const users = getUsersFromLocacalStorage();
  const userindex = users.findIndex(function (user) {
    return user.username.toLowerCase() === username.toLowerCase();
  });

  users[userindex] = user;
  localStorage.setItem('users', JSON.stringify(users));
}
