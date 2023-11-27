      // function checkLoggedIn(){
      //   loggedInUsr = localStorage.getItem('username');

      //   if(loggedInUsr) {
      //     window.location.href = 'homepage.html';
      //   }
      //   else{
      //     if (action == 'login') {
      //       window.location.href = 'login.html';
      //     }
      //     else if(action === 'signup'){
      //       window.location.href = 'signup.html';
      //     }
      //   }
      // }
      function isLoggedIn(){
        return sessionStorage.getItem('username') !== null;
      }

      user = sessionStorage.getItem('loggedInUsr');

      function checkLogIn(){
        if(user == null){
          window.location.href = 'login.html';
        }
        else{
          window.location.href = 'homepage.html'
        }
      }

      function checkSignUp(){
        if(user == null){
          window.location.href = 'signup.html';
        }
        else{
          window.location.href = "homepage.html";
        }
      }

    