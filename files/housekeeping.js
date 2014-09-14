// update navigation timing with additional calculated timings

performance.timing.phase = new Object();
if (performance.timing.secureConnectionStart == 0) {
  performance.timing.phase.ssl = 0;
} else {
  performance.timing.phase.ssl = performance.timing.connectEnd - performance.timing.secureConnectionStart;
}
performance.timing.phase.tcp = performance.timing.connectEnd - performance.timing.connectStart;
performance.timing.phase.dns = performance.timing.domainLookupEnd - performance.timing.domainLookupStart;
performance.timing.phase.redirect = performance.timing.redirectEnd - performance.timing.redirectStart;
performance.timing.phase.appCache = performance.timing.domainLookupStart - performance.timing.fetchStart;
performance.timing.phase.request = performance.timing.responseStart - performance.timing.requestStart;
performance.timing.phase.response = performance.timing.responseEnd - performance.timing.responseStart;
performance.timing.phase.load = performance.timing.loadEventEnd - performance.timing.loadEventStart;
performance.timing.phase.unload = performance.timing.domainLookEnd - performance.timing.domainLookStart;
performance.timing.phase.DOMContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart;

// update performance entries with additional calculated timings
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

// add fetch by initiator to performance interface
window.performance.getEntriesbyInitiator = function (initiator){
  var entries = new Array ();
  for(var i= 0; i < perfEntries.length; i++){
    if(perfEntries[i].initiatorType == initiator){
      entries[entries.length] = perfEntries[i];
    }
  }
  return entries;
}
