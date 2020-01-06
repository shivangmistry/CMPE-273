var User = require('../../backend/models/User');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    let returnObj = {};
    User.findById(msg.id, (err, result) => {
        console.log("Profile msg: ",msg)
        if(err) callback(err);
        else{
            returnObj = {
                message: "success",
                data: result
            }
            callback(null, returnObj)
        }
    })
};

exports.handle_request = handle_request;