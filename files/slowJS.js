

var delay= 5 * 1000 // 10 seconds
var quitAt = Date.now() + delay;
while (Date.now() <= quitAt){
  ; // good old busy waiting - doing nothing
}
