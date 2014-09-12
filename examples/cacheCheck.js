/*
 *  Did an image come from cache?
 */

var resourceList = window.performance.getEntriesByType("resource");
for (i= 0; i < resourceList.length; i++){
  if (resourceList[i].duration <= 0.0){
    console.log('Resource ' + resourceList[i].name + ' was cached.');
  } else{
    console.log('Resource ' + resourceList[i].name + ' was NOT cached.');
  }
}