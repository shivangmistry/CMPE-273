var User = require('../../backend/models/User');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {

    console.log("In people.js, msg: ", msg);
    let limit = Number(msg.limit);
    let skip = limit*Number(msg.page);
    User.find({}, ["_id", "name", "image", "role"], {skip, limit}, (err, result) => {
        if(err) {
            console.log(err)
            callback(err, { message: "error"});
        }
        else{
            callback(null, {
                message: "success",
                data: result
            })
        }
    })
};

exports.handle_request = handle_request;
