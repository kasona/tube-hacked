var querystring = require('querystring');
var http = require('http');
var crypto = require('crypto');
var output;

function findPass(i) {
  var input = i.toString();
  var sha512 = crypto.createHash('sha512');
  sha512.update(input);
  var output = sha512.digest('hex');

  makeRequest(output, i);
}

function makeRequest (output, i) {

  var postData = querystring.stringify({
    'name' : 'meep',
    'password' : output,
    'video' : 'https://www.youtube.com/watch?v=HcgJRQWxKnw'
  });

  var options = {
    hostname : '10.0.1.2',
    port : 1337,
    path : '/',
    method : 'POST',
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' : postData.length
    }
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY:' + chunk, i);
    });
    res.on('end', function() {
      // i + 1 instead of i++
      // incrementing
      findPass(i + 1);
    });
    res.on('error', function(e) {
      // i + 1 instead of i++
      // incrementing
      findPass(i + 1);
    });
  });

  req.write(postData);
  req.end();
}

// Starting i at 1
findPass(1);