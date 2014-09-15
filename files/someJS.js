
var scripts = document.getElementsByTagName( 'script' );
var scriptSource = scripts[ scripts.length - 1 ].src;

performance.mark(scriptSource + 'Start');

var delay= 5 * 1000 // 10 seconds
var quitAt = Date.now() + delay;
while (Date.now() <= quitAt){
  ; // good old busy waiting - doing nothing
}

performance.measure(scriptSource, scriptSource + 'Start');