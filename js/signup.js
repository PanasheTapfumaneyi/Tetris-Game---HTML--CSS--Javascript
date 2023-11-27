
function checkPassword() {
  let feedbackPara = document.getElementById("feedback");
  let password = document.getElementById("password").value;
  let repeatPassword = document.getElementById("repeatPassword").value;

  var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{8,})");

  if (!passwordRegex.test(password)) {
    feedbackPara.innerHTML = "Password is not secure. It must contain at least 8 characters, at least one lowercase letter, one uppercase letter, one digit, and one special character (@.#$!%*?&^).";
    return false;
  }

  if (password !== repeatPassword) {
    feedbackPara.innerHTML = "Passwords do not match.";
    return false;
  }

  storeUser(); // Call storeUser function if passwords match and are secure
  return false; // Prevents the form from submitting
}

function storeUser() {
  var feedbackPara = document.getElementById("feedback");
  var username = document.getElementById("username").value.toUpperCase();
  var password = document.getElementById("password").value;
  var birthday = document.getElementById("birthday").value;
  var gender = document.getElementById("gender").value;
  var country = document.getElementById("country").value;

  // Check if the username already exists in localStorage
  if (localStorage.getItem(username)) {
    feedbackPara.innerHTML = "Username/Email already exists.";
    return false;
  }

  // Store user if username doesn't exist
  var usrObject = {
    username: username,
    password: password,
    birthday: birthday,
    gender: gender,
    country: country
  };

  localStorage.setItem(username, JSON.stringify(usrObject));

  //Storing the username seperatley
  localStorage.setItem('username', username);


  // Inform user of successful registration
  window.location.href = "homepage.html"; // Redirect to homepage after successful validation
  return true;
}
