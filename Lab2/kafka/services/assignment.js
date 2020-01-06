var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");
var path = require('path');

function handle_request(msg, callback) {
    let returnObj = {}
    if (msg) {
        const assignment = {
            asname: msg.originalname,
            aspath: msg.filepath
        }
        Course.findOneAndUpdate({ "info._id": msg.params.id }, { $push: { assignment } }, (err, result) => {
            if (err) callback(err, { message: "error"})
            else callback(null, { message: "success"})
        });
    }
    else callback(null, { message: "error"})
};

exports.handle_request = handle_request;