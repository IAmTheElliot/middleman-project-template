$(function() {

  // instiate empty array to contain image sources
  var images = [];

  // slideJS module parameters
  $("#slides").slidesjs({
    width: 640,
    height: 480,
    start: 1
  })


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
    // var htmlElem = $("slides");
    for (var i=0; i<images.length; i++){
      console.log("the var i is", images[i]);
      $( "<img>" ).attr( "src", images[i] ).appendTo( "#slides" );
    };
  };

  getFlickr();

  console.log(images);

});
