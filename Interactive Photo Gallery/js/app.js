//this section is for the overlay
//variables for the image overlay
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p class='caption'></p>");
var $leftArrow = $("<div id='leftArrow'><a href='#'><</a></div>");
var $rightArrow = $("<div id='rightArrow'><a href='#'>></a></div>");
var $closeLightbox = $("<div id='closeLightbox'></div><div style='clear:both'></div>");

//An image to overlay
$overlay.append($image);

$image.before($closeLightbox);
$image.before($leftArrow);
$image.after($rightArrow);

//add caption
$overlay.append($caption);

//add the overlay
$("body").append($overlay);
  
//Capture the click event on a link to an image
$(".images a").click(function(event) {
  event.preventDefault();
  
  getCurrentImage(this);
   
  //Show the overlay.
  $overlay.show();
});

$leftArrow.click(function(){
  getPrevImage();
});

$rightArrow.click(function(){
  getNextImage();
});

function getCurrentImage (currentImage) {  
  thisImage = currentImage;
  var imageLocation = $(currentImage).attr("href");
    
  //Update overlay with the image linked in the link
  $image.attr("src", imageLocation);

  //Get child's alt attribute and set caption
  var captionText = $(currentImage).children("img").attr("alt");
  $caption.text(captionText);
}

function getPrevImage() {
  imageParent = $(thisImage).parent().prev();
  if(imageParent.length!==0){
      thisImage = $(imageParent).children("a");
    // imageLocation = $(thisImage).attr("href");
    // $image.attr("src", imageLocation);
  }
  getCurrentImage(thisImage);    
}

function getNextImage() {
  imageParent = $(thisImage).parent().next();
  if(imageParent.length!==0){
    thisImage = $(imageParent).children("a");
    // imageLocation = $(thisImage).attr("href");
    // $image.attr("src", imageLocation);
  }
  getCurrentImage(thisImage);
}

//When overlay is clicked
$closeLightbox.click(function(){
  //Hide the overlay
  $overlay.hide();
});

//search input
(function() {
  var $imgs = $(".images img");
  var $search = $("#input");
  var cache = [];
  
  $imgs.each(function() {
    cache.push({
      element: this,
      text: this.alt.trim().toLowerCase()
    });
  });
  function filter() {
    var query = this.value.trim().toLowerCase();
    
    cache.forEach(function(img) {
      var index = 0;
      if (query) {
        index = img.text.indexOf(query);
      }
      img.element.style.display = index === -1 ? 'none' : '';
    });
  }
    
    if ('oninput' in $search[0]) {
        $search.on('input', filter);
    } else {
      $search.on('keyup', filter);
    }
}());
