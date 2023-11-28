// Function to check if user has entered a valid password
function checkPassword() {
	let feedbackPara = document.getElementById("feedback");
	let password = document.getElementById("password").value;
	let repeatPassword = document.getElementById("repeatPassword").value;

	var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{8,})");

	if (!passwordRegex.test(password)) {
		feedbackPara.innerHTML = "Password is not secure. It must contain at least 8 characters, at least one lowercase letter, one uppercase letter, one digit, and one special character.";
		return false;
	}

	if (password !== repeatPassword) {
		feedbackPara.innerHTML = "Passwords do not match.";
		return false;
	}
  //Call function to checkEmail
	checkEmail(); 
  // Prevents the form from submitting
	return false; 
}

// Function to check if email format is correct
function checkEmail() {
	let feedbackSec = document.getElementById("feedback");
	let email = document.getElementById("email").value;

	var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (!email.match(emailRegex)) {
		feedbackSec.innerHTML = "Invalid email address"
		return false;
	}
  // Call the storeUser function to store users if validation is passed
	storeUser();
  // Prevent form from submitting
	return false;
}

// Function to store the user in the localStorage
function storeUser() {
	var feedbackPara = document.getElementById("feedback");
	var username = document.getElementById("username").value.toUpperCase();
	var password = document.getElementById("password").value;
	var email = document.getElementById("email").value;
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
		email: email,
		gender: gender,
		country: country
	};

	localStorage.setItem(username, JSON.stringify(usrObject));

	//Storing the username seperatley
	localStorage.setItem('username', username);


  //Change to next window if validation is successful
	window.location.href = "homepage.html"; 
	return true;
}