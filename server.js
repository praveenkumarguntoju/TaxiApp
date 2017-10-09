var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require("mongodb");

var app = express();
app.use(bodyParser.json());

var db;
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
   if (err) {
    console.log(err);
    process.exit(1);
  };
   db = database;
  console.log("Database connection ready");
 var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
const api = require('./src/expressRouting/routes/api');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
 app.use('/', api);

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
  
});

















