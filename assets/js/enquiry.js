
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

// Enquiry Form
document.getElementById('enquiryForm').addEventListener('submit', submitForm);

function submitForm(e) {

  e.preventDefault();

  var name = getInput('frm_name');
  var email = getInput('frm_email');
  var mobile = getInput('frm_mobile');
	var message = getInput('frm_message');

  $("#enquiryForm button").attr("disabled", "true");
  $("#enquiryForm input").attr("readonly", "true");
  $("#enquiryForm input").css("opacity", ".4");
  $("#enquiryForm textarea").css("opacity", ".4");

  $.ajax({

      url:"https://script.google.com/macros/s/AKfycbxUO53ofz4cUqY1jWQHnM3o4A2b8pFx2mBstcLIep_wv9dqYRfjcOzCQqy9M209WbwC/exec",
      data:$("#enquiryForm").serialize(),
      method:"post",
      success:function (response){

          saveEnquiry(name, email, mobile, message);
      },
      error:function (err){
          alert("Something Error")

      }
  })
}

function saveEnquiry(name, email, mobile, message) {

  var newEnquiry = enquiryRef.push();
  newEnquiry.set({

		timestamp: moment().format('DD/MM/YYYY h:mm:ss a'),
    name: name,
    email: email,
    mobile: mobile,
    message: message,
  })
  .then(function() {

    console.log('Synchronization succeeded');

    $("#enquiryForm button").removeAttr("disabled");
    $("#enquiryForm input").removeAttr("readonly");
    $("#enquiryForm input").css("opacity", "1");
    $("#enquiryForm textarea").css("opacity", "1");
    $('#enquiryForm')[0].reset();
    $(".contact-form .messages").text("Successfully Submitted.");
  })
  .catch(function(error) {

    console.log('Synchronization failed');
    $("#form-results").css("display", "block");
    $("#form-results").text("Failed Submission. Try again after reloading.");
  });
}
