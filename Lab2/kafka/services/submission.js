var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");
var path = require('path');

function handle_request(msg, callback) {
    Course.findOne({ "info._id": msg.id }, (err, result) => {
        if (err) callback(err, { message: "error"})
        else {
            let returnObj = {};
            result = result.submission;
            let data =[]
            for(let r of result){
                if(r.asname===msg.asname){
                    data.push(r);
                }
            }
            returnObj.message = "success";
            returnObj.data = data;
            callback(null, returnObj);
        }
    });
};

exports.handle_request = handle_request;