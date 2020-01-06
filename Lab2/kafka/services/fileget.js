var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    let returnObj = {};
    Course.findOne({ "info._id": msg.id }, (err, result) => {
        if (err) callback(err, { message: "error"})
        else {
            returnObj.data = result.lecture;
            returnObj.message = "success";
            callback(null, returnObj);
        }
    });
};

exports.handle_request = handle_request;