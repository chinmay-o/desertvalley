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

    document.getElementById('productList').innerHTML += '<div id="'+ productArray[i].key +
    '" class="project item col-md-6 col-xl-4 '+ productArray[i].category.toLowerCase().split("(")[0].split(" ").join("") +'">'+
      '<figure class="lift rounded mb-6"><a href="https://wa.me/971508337134?text=Hi%2C%20I%20want%20to%20place%20an%20order('+
      productArray[i].name +')"> <img src="'+ productArray[i].imageURL +'" alt=""/></a></figure>'+
      '<div class="project-details justify-content-center custom-grid">'+
        '<div class="post-header">'+
          '<h2 class="post-title h3">'+ productArray[i].name +'</h2>'+
          '<div class="post-category text-line mb-3 text-purple">'+ productArray[i].category +'</div>'+
        '</div>'+
        '<a href="https://wa.me/971508337134?text=Hi%2C%20I%20want%20to%20place%20an%20order('+ productArray[i].name +
        ')" class="btn btn-primary">Order Now</a>'+
      '</div>'+
    '</div>'
  }
}
