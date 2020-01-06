var Message = require('../../backend/models/Message');
require("../../backend/mongoose.js");
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    Message.find({$or: [{"id1": currentUser.id}, {"id2": currentUser.id}]}, (err, result) => {
        if(err){
            callback(err, {message: "error"})
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