
document.getElementById('loginForm').addEventListener('submit', loginForm);

function loginForm(e) {

  e.preventDefault();

  $("#loginForm button").attr("disabled", "true");
  $("#loginForm input").attr("readonly", "true");
  $("#loginForm input").css("opacity", ".4");

  var username = getInput('username');
  var credential = getInput('password');

  firebase.auth().signInWithEmailAndPassword(username, credential)
    .then((userCredential) => {

      // Signed in
      var user = userCredential.user;
      console.log('Signed In');
      window.location.href = "/dashboard.html";
      // ...
    })
    .catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      $("#login-error").text("Error:"+ error.code +". Please check the username or password you entered.");

      $("#loginForm button").removeAttr("disabled");
      $("#loginForm input").removeAttr("readonly");
      $("#loginForm input").css("opacity", "1");
      $("#loginForm textarea").css("opacity", "1");
    });
}
