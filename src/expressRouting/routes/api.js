const express = require('express');
// const driverDetails = require('../database');
var fs   = require("fs");
const router = express.Router();

router.post('/app',function (req, res) {
   console.log(req.body)
   var action = req.body.action;
   var data   = req.body.data;
   var fname  = req.body.fileName;
switch(action) {
    case 'create':

        driverDetails.update(
            {picFile:data.picFile},
            function(err, numberAffected){
            });

        driverDetails.create(data, function (err) {
             if (err) {
                       console.log(err);
                       return handleError(err);
                          }else{
                     res.send({confirm : "created" });
                     console.log("created");

                        }

                      });


            
        break;
    case 'getData':
        console.log('app');
            var docsdata;
            console.log(driverDetails);
    
     db.collection(drivers).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
//             driverDetails.find({}, function (err, docs) {
//                 docsdata = docs;
//                 console.log(docsdata);
//                 res.send({driverData: docsdata});
//             });
         break;

    case 'getDetail':
        console.log(data);
        driverDetails.find({CARNUM:data}, function (err, docs) {
            docsdata = docs;

            if(docsdata){
                res.send({driverDetail: docsdata[0]});
            }

        });
        break;
    case 'upLoad':
       function decodeBase64Image(dataString) {
               var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
        };
        var imageBuffer = decodeBase64Image(data);
        var newPath = __dirname + "/app/images/" + fname;
        fs.writeFile(newPath, imageBuffer.data, function(err) {
                res.send({confirm : "uploaded" , filename:fname });
             });
       break;
    case 'updateDetail':
        var conditions = {CARNUM:data.CARNUM};
        options = { multi: true };
         function callback(err, numAffected) {
              if (err) {
                 console.log(err);
                 return handleError(err);
             }else {
                 res.send({confirm: "Successfully updated", number: numAffected});
             }
             };
        driverDetails.update(conditions,data, options, callback);


        break;
    // case 'deleteDetail':
    //     var conditions = {CARNUM:data.CARNUM};
    //     options = { multi: true };
    // function callback(err, numAffected) {
    //     if (err) {
    //         console.log(err);
    //         return handleError(err);
    //     }else {
    //         res.send({confirm: "Successfully deleted", number: numAffected});
    //     }
    // };
    //     driverDetails.remove(conditions,callback);


        // break;

     default:
       
}
})
module.exports = router;
