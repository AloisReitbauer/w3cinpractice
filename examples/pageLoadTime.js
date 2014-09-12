
// how long does it take to load a page?

var timing = window.performance.timing;
var loadTime = (timing.loadEventEnd - timing.navigationStart)/1000;
alert ('Load time is ' + loadTime  + ' seconds');


// which resource took the longest to load?
var resourceList = window.performance.getEntriesByType("resource");
for (i = 0; i < resourceList.length; i++){
  if (resourceList[i].initiatorType == "img") {
    console.log('Load time is ' + (resourceList[i].responseEnd - resourceList[i].startTime + ' ms'));
  }
}

// how fast is Steve
resourceList[0].responseEnd - resourceList[0].startTime;


// does a resource come from  cache?

// which image failed to load?


var elems= document.getElementsByTagName('img');
var definedImages = new Array();
for (i = 0; i < elems.length; i++) {
  definedImages[definedImages.length] = "http://mythirdparty.com:3000/" + elems[0].getAttribute('src');
}

var loadedImages = new Array ();
var resourceList = window.performance.getEntriesByType("resource");
for (i = 0; i < resourceList.length; i++){
  if (resourceList[i].initiatorType == "img") {
    loadedImages[loadedImages.length]= resourceList[i].name;
  }
}





// timing an AJAX event

// Page Visibility

// did my above the fold content load?




