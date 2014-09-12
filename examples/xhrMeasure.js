


var perfEntries = performance.getEntriesByType("measure");
for(i = 0; i < perfEntries.length; i++){
  console.log(perfEntries[i].name + ' took ' + perfEntries[i].duration.toFixed(2) + ' ms');
}
