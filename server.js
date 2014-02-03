var http = require("http");
var url = require("url");
 
function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
 
    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk\n\t" +
      postDataChunk );
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

    // route(handle, pathname);
 
    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.write("Hello World");
    // var content = route(handle, pathname)
    // response.write(content);
    // response.end();
    
    // route(handle, pathname, response);
  }
  
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
 
exports.start = start;
 
/*
var http = require('http'); 
http.createServer(function (req, res) { 
    res.end('Hello from Nodejs');
}).listen(3000); 
 
console.log('Now listening')
*/
