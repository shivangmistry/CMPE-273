var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");
var cu = require("../api/data");
let currentUser = cu.getUser();

function handle_request(msg, callback) {
    let returnObj = {};
    Course.findOne({"info._id" : msg.id}, (err, result) => {
        // console.log(result);
        if (err) callback(err, {message: "error"});
        else {
            if (currentUser.role === "student") {
                returnObj.status = "none";
                for(let stud of result.students){
                    if(stud.sid===currentUser.id){
                        returnObj.status = stud.status;
                        break;
                    }
                }
            }
            returnObj.message = "success";
            returnObj.data = result.info;
            callback(null, returnObj);
        }
    })
};

exports.handle_request = handle_request;