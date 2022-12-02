
let productsRef = firebase.database().ref('product-database');
let productList;
var productArray = [];

var load = false;
var interv = setInterval(checkLoader, 100);

function checkLoader() {

  if (load) {

    productTable();
    clearInterval(interv);
  }
}

productsRef.on("value", function(snapshot) {

   productList = snapshot.val();
   load = true;
}, function (error) {

   console.log("Error: " + error.code);
});

function productTable() {

  productArray = [];

  for (let key in productList) {

    productArray.push({
      key: key,
      timestamp: productList[key].timestamp,
      name: productList[key].title,
      category: productList[key].category,
      imageURL: productList[key].productURL,
    });
  }
  productArray.reverse();
  productHTML();
}

function productHTML() {

  for (var i = 0; i < productArray.length; i++) {

    document.getElementById('productList').innerHTML += '<tr>' +
      '<td id="" class="option text-start d-flex flex-row align-items-center ps-0">'+
      '<figure class="rounded w-17"><a href="#"><img src="'+ productArray[i].imageURL +'" alt="" /></a></figure>'+
        '<div class="w-100 ms-4">'+
          '<h3 class="post-title h6 lh-xs mb-1"><a href="#" class="link-dark">'+ productArray[i].name +'</a></h3>'+
        '</div>'+
      '</td>'+
      '<td>'+
        '<p class="price"><span class="amount">'+ productArray[i].category +'</span></p>'+
      '</td>'+
      '<td class="pe-0">'+
        '<a href="#" class="link-dark"><i class="uil uil-trash-alt"></i></a>'+
      '</td>'+
    '</tr>'
  }
}

document.getElementById('addProductForm').addEventListener('submit', submitForm);

function submitForm(e) {

  e.preventDefault();

  var title = getInput('productName');
  var category = getInput('productCategory');

  saveProduct(title, category);
}

function saveProduct(title, category) {

  var productData = productsRef.push();
  productData.set({

      timestamp: moment().format('DD/MM/YYYY h:mm:ss a'),
      title: title,
      category: category,
      productURL: document.querySelector('#productDummy').src
    })
    .then(function() {

      console.log('Synchronization succeeded');
      location.reload();
    })
    .catch(function(error) {

      console.log('Synchronization failed');
    });
}

function chooseUpload() {

  var uploadProgress = setInterval(function() {

    $('.tenor-gif-embed').css("display", "block");
    if (document.querySelector('#productImg').files[0] != null) {

      imageUpload();
      clearInterval(uploadProgress);
    }
  }, 200)
}

function imageUpload() {

  const ref = firebase.storage().ref();
  const file = document.querySelector('#productImg').files[0];
  const name = (+new Date()) + '-' + file.name;
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);

  task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
      uploadFinishSwitch = true;
      document.querySelector("#productDummy").src = url;
      $('.tenor-gif-embed').css("display", "none");
    })
    .catch(console.error);
}
