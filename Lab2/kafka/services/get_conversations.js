var Message = require('../../backend/models/Message');
require("../../backend/mongoose.js");
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    Message.findOne({$or: [{$and:[{"id1":currentUser.id},{"id2":msg.id},{"sub":msg.sub}]},{$and:[{"id1":msg.id},{"id2":currentUser.id},{"sub":msg.sub}]}]}, (err, result) => {
        if (err) {
            callback(err, { message: "error" })
        }
        else {
            callback(null, {
                message: "success",
                data: result.msg
            })
        }
    })
};

exports.handle_request = handle_request;