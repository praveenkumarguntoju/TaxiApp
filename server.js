var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
 var ObjectId = require('mongodb').ObjectId; 

var app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

// Create link to Angular build directory


var distDir = __dirname + "/dist/";
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src/app/images'));
app.use(express.static(distDir));
// app.use(express.static(__dirname + 'ajax-loader(1).gif'));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

var db;

// mongodb://<dbuser>:<dbpassword>@ds229415.mlab.com:29415/taxidetails
// mongodb://chintu:chintu123@ds161164.mlab.com:61164/taxidetails

mongodb.MongoClient.connect('mongodb://chintu:chintu123@ds229415.mlab.com:29415/taxidetails', function (err, database) {
   if (err) {
    console.log(err);
    process.exit(1);
  };
   db = database;
  console.log("Database connection ready");
  
    // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
  
  

// const api = require('./src/expressRouting/routes/api');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// });
//  app.use('/', api);
  
  
//   app.post("/app",function (req, res) {
//    console.log(req.body)
//    var action = req.body.action;
//    var newContact = req.body;
//    var data   = req.body.data;
//    var fname  = req.body.fileName;
//    db.collection("drivers").insertOne(newContact, function(err, res) {
//              if (err) {
//                        console.log(err);
//                        return handleError(err);
//                           }else{
//                      res.send({confirm : "created" });
//                      console.log("created");

//                         }

//                       });
    
    
// switch(action) {
//     case 'create':
//      db.collection("drivers").insertOne(data, function(err, res) {
//              if (err) {
//                        console.log(err);
//                        return handleError(err);
//                           }else{
//                      res.send({confirm : "created" });
//                      console.log("created");

//                         }

//                       });
//         break;
//  case 'getDetail':
//         console.log(data);
//         driverDetails.find({CARNUM:data}, function (err, docs) {
//             docsdata = docs;

//             if(docsdata){
//                 res.send({driverDetail: docsdata[0]});
//             }

//         });
//         break;
//     case 'upLoad':
//        function decodeBase64Image(dataString) {
//                var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//             response = {};

//         if (matches.length !== 3) {
//             return new Error('Invalid input string');
//         }

//         response.type = matches[1];
//         response.data = new Buffer(matches[2], 'base64');

//         return response;
//         };
//         var imageBuffer = decodeBase64Image(data);
//         var newPath = __dirname + "/app/images/" + fname;
//         fs.writeFile(newPath, imageBuffer.data, function(err) {
//                 res.send({confirm : "uploaded" , filename:fname });
//              });
//        break;
//     case 'updateDetail':
//         var conditions = {CARNUM:data.CARNUM};
//         options = { multi: true };
//          function callback(err, numAffected) {
//               if (err) {
//                  console.log(err);
//                  return handleError(err);
//              }else {
//                  res.send({confirm: "Successfully updated", number: numAffected});
//              }
//              };
//         driverDetails.update(conditions,data, options, callback);


//         break;
//     // case 'deleteDetail':
//     //     var conditions = {CARNUM:data.CARNUM};
//     //     options = { multi: true };
//     // function callback(err, numAffected) {
//     //     if (err) {
//     //         console.log(err);
//     //         return handleError(err);
//     //     }else {
//     //         res.send({confirm: "Successfully deleted", number: numAffected});
//     //     }
//     // };
//     //     driverDetails.remove(conditions,callback);


//         // break;

//      default:
       
// }
// })
  
  
  app.get("/app", function(req, res) {
  db.collection("driversData").find({}).toArray(function(err, docs) {
    if (err) {
        console.log("ERROR: " + reason);
         res.status(code || 500).json({"error": message});
    } else {
     res.status(200);
     res.send({data: docs});
    }
  });
});
  
  app.get("/app/contacts/:id", function(req, res) {
    db.collection("driversData").findOne({_id:  ObjectId(req.params.id)},function(err, docs){
    if (err) {
        console.log("ERROR: " + reason);
         res.status(code || 500).json({"error": message});
    } else {
     res.status(200);
     res.send({data: docs});
    }
  });
});
  
app.get("/app/comments/:id", function(req, res) {
    db.collection("commentsData").findOne({userId: req.params.id},function(err, docs){
    if (err) {
        console.log("ERROR: " + reason);
         res.status(code || 500).json({"error": message});
    } else {
     res.status(200);
     res.send({data: docs});
    }
  });
});
  
  
app.post("/app/comments", function(req, res) {
    var newComment = req.body;
  db.collection("commentsData").insertOne(newComment, function(err, doc) {
    if (err) {
        console.log("ERROR: " + reason);
         res.status(code || 500).json({"error": message});
    } else {
     res.status(200);
     res.send({data: docs});
    }
  });
});
  

app.put("/app/contacts/:id", function(req, res) {
      var updateDoc = req.body;
      delete updateDoc._id;
   db.collection("driversData").updateOne({_id:  ObjectId(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200);
       res.send({data: updateDoc});
    }
  });
 });
  
  
  
  
  
 

 
  
  
  app.post("/app/contacts", function(req, res) {
  var newContact = req.body;
  db.collection("driversData").insertOne(newContact, function(err, doc) {
    if (err) {
     console.log("ERROR: " + reason);
         res.status(code || 500).json({"error": message});
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
  });

















