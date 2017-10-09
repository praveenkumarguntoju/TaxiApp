// const mongoose = require("mongoose");
var promise = require('promise');
// mongoose.connect('mongodb://127.0.0.1:27017/my_database');
// mongoose.createConnection('mongodb://chintu:chintu123@ds161164.mlab.com:61164/taxidetails');

// var promise = mongoose.createConnection('mongodb://chintu:chintu123@ds161164.mlab.com:61164/taxidetails', {
//   useMongoClient: true,
//   /* other options */
// });

// promise.then(function(db) {
 
// //  var db = mongoose.connection;
//  db.on('error', console.error.bind(console, 'connection error:'));
//  db.once('openUri', function() {
//   // we're connected!
//   console.log("connection succesful");
// });
// });



// //  var db = mongoose.connection;
// //  db.on('error', console.error.bind(console, 'connection error:'));
// //  db.once('openUri', function() {
// //   // we're connected!
// //   console.log("connection succesful");
// // });

// var Schema = mongoose.Schema;

// var driverSchema = new Schema({
//     DRVFNAME:String,
//     DRVLNAME:String,
//     DRVAGE:Number,
//     CARNUM:{
//         type:String,
//         unique:true
//     },
//     CARNAME:String,
//     ADDRS1:String,
//     ADDRS2:String,
//     CITY:String,
//     ZIPCODE:Number,
//     COUNTRY:String,
//     PHNO:Number,
//     picFile:{type:String}
// },{ strict: false })

// var driverDetails = mongoose.model('driverDetails',driverSchema);



var db;
mongodb.MongoClient.connect('mongodb://chintu:chintu123@ds161164.mlab.com:61164/taxidetails', function (err, database) {
   if (err) {
    console.log(err);
    process.exit(1);
  };
   db = database;
  console.log("Database connection ready");
 db.createCollection("drivers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

module.exports = db;
