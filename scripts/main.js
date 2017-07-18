var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESCAPE_KEY_TO_HIDE_DETAIL_IMAGE = 27;
var IS_TINY_CLASS = 'is-tiny';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';



//Function setdetails() to change the detail-image automatically
function setDetails(imageUrl, titleText) {
    'use strict'; //to tell the browser of the latest version of javascript
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR); // set reference of the detailed image to variable
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb){
    'use strict';
    thumb.addEventListener('click', function(event){
        event.preventDefault(); // stops default action of and event to happen
        setDetailsFromThumb(thumb);
        showDetails();
    });

}


function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function initializeEvents(){
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

//create a function hideDetails(), whose job is to add a class name to <body>
function hideDetails(){
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS); //classList.add - used to manipulate class name.
    // document.body property to access <body> element.
    //used .add method to add hidden-detail class to body
}

// a function to show details of the hidden detailed image
function showDetails(){
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.body.classList.add(IS_TINY_CLASS);
    setTimeout(function(){
      // setTimeout method: adds delay time since js doesnot have its own sleep function or built-in delay
        frame.classList.remove(IS_TINY_CLASS);
    },50);
}


function addKeyPressHandler(){ // to allow keyboard press and display the integral value for the key pressed on the console
    'use strict';
    document.body.addEventListener('keyup', function(event){
        event.preventDefault();
        console.log(event.keyCode);
        //Keycode corresponds to the key that triggered an event.keyCode is an integer(13-return, 32-space bar,38-up arrow)
        if (event.keyCode === ESCAPE_KEY_TO_HIDE_DETAIL_IMAGE){
            // ' === ' is Strict Equality Operator to compare values
            // ' == ', Loose equality operator can also be used but it can convert from one type of value to another.hence, not preferred.
            hideDetails();
        }
        // the above if statement to hide detailed image
    });
}

initializeEvents();
