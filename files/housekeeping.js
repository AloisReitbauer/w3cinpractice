

var perfEntries = performance.getEntries();

for (var i=0; i < perfEntries.length; i++){
  entry = perfEntries[i];
  entry.timing = new Object();
  entry.timing.tcp = entry.connectStart - entry.connectEnd;
  entry.timing.ssl = entry.connectEnd - entry.secureConnectionStart;
  entry.timing.response = entry.responseEnd - entry.responseStart;
  entry.timing.dns = entry.domainLookupStart - entry.domainLookupStart;
  entry.timing.redirect = entry.redirectEnd = entry.redirectStart;
  entry.timing.request = entry.responseStart - entry.requestStart;
  if (entry.domainLookupStart != 0) {
    entry.timing.appCache = entry.domainLookupStart - entry.fetchStart;
  }
}

window.performance.getEntriesbyInitiator = function (initiator){

  var entries = new Array ();
  for(var i= 0; i < perfEntries.length; i++){
    if(perfEntries[i].initiatorType == initiator){
      entries[entries.length] = perfEntries[i];
    }
  }
  return entries;
}
