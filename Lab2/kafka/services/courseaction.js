var Course = require('../../backend/models/Course');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");
let currentUser = cu.getUser();

function handle_request(msg, callback) {
    if(msg.action==="enroll"||msg.action==="waitlist"){
        const stud = {
            sid: currentUser.id,
            sname: currentUser.name,
            simage: currentUser.image,
            status: msg.action
        }
        Course.findOneAndUpdate({ "info._id": msg.id }, { $push:{ students:stud}}, (err) => {
            if (err) callback(err, {message: "error"});
            else callback(null, {message: "success"});
        });
    }
    else if(msg.action==="drop"){
        Course.findOneAndUpdate({ "info._id": msg.id }, { $pull: { students: { sid : currentUser.id}}}, (err) => {
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
            // if (err) callback(err, {message: "error"});
            // else callback(null, {message: "success"});
        })
    }
};

exports.handle_request = handle_request;