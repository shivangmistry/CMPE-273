var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    Course.findOne({ "info._id": msg.id }, (err, result) => {
        if (err) callback(err, {message: "error"});
        else {
            let returnObj = {};
            returnObj.data = result.quiz;
            returnObj.message = "success";
            callback(null, returnObj);
        }
    });
};

exports.handle_request = handle_request;