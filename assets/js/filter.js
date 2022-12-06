
let categories = [];

$(".filter-item").each(function() {

  categories.push($(this).attr('data-filter'));
});


$(".filter-item").click(function() {

  var filter = $(this).attr("data-filter");
  if (filter == "*") {

    for (var i = 1; i < categories.length; i++) {

      // console.log(categories[i], $(categories[i]));
      $(categories[i]).each(function() {

        $(this).css('display', "block");
      });
    }
  } else {

    for (var i = 1; i < categories.length; i++) {

      $(categories[i]).each(function() {

        console.log($(this));
        $(this).css("display", "none");
      });
    }
    $(filter).css("display", "block");
  }
})
