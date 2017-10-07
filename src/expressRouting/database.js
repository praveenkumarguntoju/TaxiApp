const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/my_database');
mongoose.connect('mongodb://chintu:chintu123@ds161164.mlab.com:61164/taxidetails');

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
  // we're connected!
  console.log("connection succesful");
});

var Schema = mongoose.Schema;

var driverSchema = new Schema({
    DRVFNAME:String,
    DRVLNAME:String,
    DRVAGE:Number,
    CARNUM:{
        type:String,
        unique:true
    },
    CARNAME:String,
    ADDRS1:String,
    ADDRS2:String,
    CITY:String,
    ZIPCODE:Number,
    COUNTRY:String,
    PHNO:Number,
    picFile:{type:String}
},{ strict: false })

var driverDetails = mongoose.model('driverDetails',driverSchema);

module.exports = driverDetails;
