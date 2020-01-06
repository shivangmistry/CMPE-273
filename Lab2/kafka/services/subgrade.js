var Course = require('../../backend/models/Course');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var path = require('path');
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    if (currentUser.role === "student") {
        if (msg.file) {
            const submission = {
                sid: currentUser.id,
                sname: currentUser.name,
                asname: msg.asname,
                subname: msg.file.originalname,
                subpath: msg.filepath
            }
            Course.findOneAndUpdate({ "info._id": msg.id }, { $push: { submission } }, (err, result) => {
                if (err) callback(err, { message: "error" });
                else callback(null, { message: "success" });
            });
        }
        else {
            callback(null, { message: "error" });
        }
    }
    else{
        const grade = {
            sid: msg.body.sid,
            sname: msg.body.sname,
            cid: msg.id,
            typeof: "ass",
            typename: msg.asname,
            grade: msg.body.grade
        }
        Course.findOneAndUpdate({"info._id": msg.id}, { $push: { grade }}, (err,result) => {
            if (err) callback(err, { message: "error" });
            else {
                User.findByIdAndUpdate(msg.body.sid, { $push: { grade } }, (err, result) => {
                    if (err) callback(err, { message: "error" });
                    else callback(null, { message: "success" });
                })
            }
        })
    }
};

exports.handle_request = handle_request;