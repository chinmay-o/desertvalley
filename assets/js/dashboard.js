setTimeout(function() {

  if (firebase.auth().currentUser == null) {

    window.location.href = "/signin.html";
  }
}, 5000)

let enquiryRef = firebase.database().ref('enquiry-database');
let enquiryList;
var enquiryArray = [];

var load = false;
var interv = setInterval(checkLoader, 100);

function checkLoader() {

  if (load) {

    enquiryTable();
    clearInterval(interv);
  }
}

enquiryRef.on("value", function(snapshot) {

   enquiryList = snapshot.val();
   load = true;
}, function (error) {

   console.log("Error: " + error.code);
});

function enquiryTable() {

  enquiryArray = [];

  for (let key in enquiryList) {

    enquiryArray.push({
      key: key,
      timestamp: enquiryList[key].timestamp,
      name: enquiryList[key].name,
      email: enquiryList[key].email,
      mobile: enquiryList[key].mobile,
      message: enquiryList[key].message,
    });
  }
  enquiryArray.reverse();
  enquiryHTML();
}

function enquiryHTML() {

  for (var i = 0; i < enquiryArray.length; i++) {

    document.getElementById('enquiryList').innerHTML += '<tr id="'+ enquiryArray[i].key +'">'+
      '<td>'+
        '<p class="price"><span class="amount">'+ enquiryArray[i].timestamp +'</span></p>'+
      '</td>'+
      '<td class="option text-start d-flex flex-row align-items-center ps-0">'+
        '<div class="w-100">'+
          '<h3 class="post-title h6 lh-xs mb-1 link-dark">'+ enquiryArray[i].name +'</h3>'+
        '</div>'+
      '</td>'+
      '<td>'+
        '<p class="price"><span class="amount">'+ enquiryArray[i].email +'</span></p>'+
      '</td>'+
      '<td>'+
        '<p class="price"><span class="amount">'+ enquiryArray[i].mobile +'</span></p>'+
      '</td>'+
      '<td>'+
        '<p class="price"><span class="amount">'+ enquiryArray[i].message +'</span></p>'+
      '</td>'+
    '</tr>'
  }
}
