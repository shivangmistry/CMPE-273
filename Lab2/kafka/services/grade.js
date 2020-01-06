var Course = require('../../backend/models/Course');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    let returnObj = {};
    if(currentUser.role==="faculty"){
        Course.findOne( {"info._id": msg.id}, (err,result) => {
            if (err) callback(err, {message: "error"})
            else {
                returnObj.data = result.grade;
                returnObj.message = "success";
                callback(null, returnObj);
            }
        })
    } else if(currentUser.role==="student"){
        User.findOne( { $and: [{"_id":currentUser.id}, {"grade.cid": msg.id }]}, (err, result) => {
            console.log("Query result:")
            console.log(result)
            if (err) callback(err, { message: "error" })
            else {
                if(result!==null) returnObj.data = result.grade;
                else returnObj.data = [];
                returnObj.message = "success";
                callback(null, returnObj);
            }
        })
    }
};

exports.handle_request = handle_request;