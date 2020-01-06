var User = require('../../backend/models/User');
var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");
var cu = require("../api/data");

function handle_request(msg, callback) {
    let returnObj = {};
    let currentUser = cu.getUser();
    console.log("Current User------>", currentUser)
    if (currentUser.role === "faculty") {
        Course.find({ "info.fid": currentUser.id }, (err, result) => {
            console.log(result);
            if (err) callback(err);
            else {
                returnObj.message = "success";
                returnObj.data = result;
                callback(null, returnObj);
            }
        })
    }
    else if (currentUser.role === "student") {
        Course.find({ "students.sid": currentUser.id }, (err, result) => {
            // console.log(result);
            if (err) callback(err);
            else {
                returnObj.message = "success";
                returnObj.data = result;
                callback(null, returnObj);
            }
        })
    }   
};

exports.handle_request = handle_request;