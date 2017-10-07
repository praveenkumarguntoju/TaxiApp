var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());

const api = require('./src/expressRouting/routes/api');

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));



  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });











