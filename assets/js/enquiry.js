
let enquiryRef = firebase.database().ref('enquiry-database');


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
