
/*
Which image failed to load?
 */


// find all images in the DOM

var elems= document.getElementsByTagName('img');
var definedImages = new Array();
for (i = 0; i < elems.length; i++) {
  definedImages[definedImages.length] = "http://mythirdparty.com:3000/" + elems[0].getAttribute('src');
}

// find all images that were loaded

var loadedImages = new Array ();
var resourceList = window.performance.getEntriesByType("resource");
for (i = 0; i < resourceList.length; i++){
  if (resourceList[i].initiatorType == "img") {
    loadedImages[loadedImages.length]= resourceList[i].name;
  }
}

// check the difference

for (i = 0; i < definedImages.length; i++){
  if(loadedImages.indexOf(definedImages[i]) < 0){
    console.log('Image ' + definedImages[i] + ' failed to load');
  } else {
    console.log('Image ' + definedImages[i] + ' loaded successfully');
  }
}