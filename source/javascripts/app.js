$(function() {

  // instiate empty array to contain image sources
  images = [];
  var current = 0;
  var next = 1;

  // get images from flickr, push to array
  function getFlickr(e) {
    console.log("getflickr");
    var query = "superhero";
    // console.log(e);
    if (e) {
      if (e.type === "click") {
        query = $("#userTag").val();
      }
    };
    console.log(query);
    flickr(query);
    };

    function flickr(query){
      var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      $.getJSON( flickerAPI, {
        tags: query,
        tagmode: "any",
        format: "json"
      })
        .done(function( data ) {
          console.log(data);
          $.each( data.items, function( i, item ) {
            images.push(item.media.m);
            if ( i === 80 ) {
              return false;
            }
          });
          imgToDom();
        });
      };

  //loop through array, append images to html
  function imgToDom() {
    console.log("imgToDom");
    for (var i=0; i<images.length; i++){
      var image = $("<img>");
      image.attr({
        src: images[i],
        "class": "hidden",
        id: i
      })
      $("#slides").append(image);
    };
  };

  // FadeOut current Image
  function hideImage() {
    $("#" + current).fadeOut(500);
    current++;
    if (current > images.length) {
      current = 0
    };
    setTimeout(showImage, 500);
  };

  // FadeIn next Image
  function showImage() {
    $("#" + next).fadeIn(500);
    next ++;
    if (next > images.length) {
      next = 0
    };
  };

  // implmement for form validation
  $("#submit").on("click", function() {
    alert("sorry, that doesn't work!")
  });

  getFlickr();

  console.log(images);

  var intervalID = setInterval(hideImage, 5000)
});
