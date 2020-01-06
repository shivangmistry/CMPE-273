var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    let returnObj = {};
    User.findByIdAndUpdate(currentUser.id, msg, {new : true}, (err, todo) => {
        // console.log(todo);
        if(err){
            returnObj.message = "error";
            callback(err, returnObj);
        }
        else{
            currentUser.image = msg.image;
            returnObj.message = "success";
            callback(null, returnObj);
        }
    });
};

exports.handle_request = handle_request;