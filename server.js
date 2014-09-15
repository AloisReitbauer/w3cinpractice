var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

var lastBeacon;

// web server logic
var server= http.createServer(function(request, response){

  var filePath= false;
  if(request.url == '/beacon'){
    handleBeacon (request, response);
  }
  else if (request.url == '/'){
    filePath = 'files/index.html';
  } else {
    filePath = 'files' + request.url;
  }
  var absPath = './' + filePath;
  serveStatic(response, absPath);
});

function handleBeacon (request, response){
  if (request.method == 'POST'){
    request.content= '';
    request.addListener("data", function(chunk) {
      request.content += chunk;
    });
    request.addListener("end", function() {
      lastBeacon =  request.content;
    });
    response.writeHead(
      200,
      {'content-type': 'text/html',
        'Access-Control-Allow-Origin' : '*'
      }
    );
    response.end("done");
  }
  else {
    response.writeHead(
      200,
      {'content-type': 'text/html',
        'Access-Control-Allow-Origin' : '*'
      }
    );
    response.end("var data = " + lastBeacon);
  }
}

function send404(response){

  response.writeHead (404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Requested resource not found');
  response.end();
}

function serveStatic(response, absPath){

  if (absPath.indexOf('slow') != -1){
    var startIndex = absPath.indexOf('slow');
    absPath = absPath.replace('slow', '');
    console.log("changed path " + absPath);
    setTimeout(function(){serveStatic(response, absPath);}, 2000);
  } else {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function (err, data) {
        if (err) {
          send404(response);
        }
        else {
          sendFile(response, absPath, data);
          console.log("returning content " + absPath);
        }
      });
    }
    else {
      send404(response);
    }
  });
  }

}

function sendFile (response, filePath, fileContents) {

  if (filePath.indexOf('cached') == -1) {
    response.writeHead(
      200,
      {'content-type': mime.lookup(path.basename(filePath))
        ,'Timing-Allow-Origin' : '*'
      });
  }else {
    response.writeHead(
      200,
      {'Content-Type': mime.lookup(path.basename(filePath)),
       'Cache-Control': 'max-age=10000'
      }
    );
  }
  response.end(fileContents);

}

// starting the server
server.listen(3000);
console.log('Server running at http://localhost:3000');



