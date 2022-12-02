// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpE9Ohi5T-IwkPpTh4bXXwtfwxRaCDVno",
  authDomain: "desert-valley-2cd67.firebaseapp.com",
  databaseURL: "https://desert-valley-2cd67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "desert-valley-2cd67",
  storageBucket: "desert-valley-2cd67.appspot.com",
  messagingSenderId: "637689682185",
  appId: "1:637689682185:web:e4dd74075fdf73ef299bd8",
  measurementId: "G-ED01C3CE2T"
};

firebase.initializeApp(firebaseConfig);

function signingOut() {

  firebase.auth().signOut().then(() => {

    window.location.href = "/signin.html";
  }).catch((error) => {

    console.log('Signing Out Failed')
  });
}

var checkLogin = setInterval(function() {

  if (firebase.auth().currentUser != null) {

    $("#logStatus").css("display", "block");
    clearInterval(checkLogin);
  }
}, 200)

// General Function
function getInput(id) {

  return document.getElementById(id).value;
}
