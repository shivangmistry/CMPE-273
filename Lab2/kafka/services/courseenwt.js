var Course = require('../../backend/models/Course');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");
let currentUser = cu.getUser();

function handle_request(msg, callback) {
    let returnObj = {}, code = "";
    console.log("CourseEnWt msg:")
    if(msg.action==="enroll"){
        //generate permission code here
        let date = new Date();
        let ms = date.getMilliseconds();
        let y = date.getFullYear();
        let s = date.getSeconds();
        let m = date.getMonth();
        let min = date.getMinutes()
        let d = date.getDay();
        let h = date.getHours();
        let arr = [ms, y, s, m, min, d, h];
        code = arr.join("");
        returnObj.code = code;
        Course.findOneAndUpdate({ $and: [{"info._id": msg.cid},{"students.sid": msg.sid}]}, { $set: {"students.$.status": "enroll" } }, (err) => {
            if(err) callback(err, { message: "error"})
            else {
                returnObj.message = "success";
                callback(null, returnObj);
            }
        });
    }
    else if(msg.action==="remove"){
        Course.findOneAndUpdate({ "info._id": msg.cid }, { $pull: { students: { sid: msg.sid } } }, (err) => {
            Course.findOneAndUpdate({ "info._id": msg.id }, { $pull: { grade: { sid: currentUser.id } } }, (err) => {
                Course.findOneAndUpdate({ "info._id": msg.id }, { $pull: { submission: { sid: currentUser.id } } }, (err) => {
                    User.findByIdAndUpdate(currentUser.id, { $pull: { grade: { cid: msg.id } } }, (err) => {
                        User.findByIdAndUpdate(currentUser.id, { $pull: { submitted: { cid: msg.id } } }, (err) => {
                            if (err) callback(err, { message: "error" })
                            else callback(null, { message: "success" })
                        })
                    })
                })
            })
        });
    }
};

exports.handle_request = handle_request;