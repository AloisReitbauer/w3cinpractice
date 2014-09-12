// how long does it take to load a page?

var timing= performance.timing;
var loadTime= (timing.loadEventEnd- timing.navigationStart)/1000;
console.log('Page took ' + loadTime.toFixed(2) + ' seconds to load');


