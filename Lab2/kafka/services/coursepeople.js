var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");
var cu = require("../api/data");
let currentUser = cu.getUser();

function handle_request(msg, callback) {
    Course.findOne({"info._id": msg.id}, (err, result) =>{
        if (err) callback(err, { message: "error"});
        else {
            let returnObj = {};
            returnObj.message = "success";
            returnObj.data = result.students;
            callback(null, returnObj);
        } 
    })
};

exports.handle_request = handle_request;