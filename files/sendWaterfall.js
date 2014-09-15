function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  var url = 'http://localhost:3000/beacon';
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    console.error('CORS not supported');
    return;
  }
  xhr.onload = function() {
    var text = xhr.responseText;
    alert('Response from CORS request to ' + url + ': ' + text);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  var entries = performance.getEntries();
  var json = JSON.stringify(entries);
  xhr.send(json);
}
makeCorsRequest();
