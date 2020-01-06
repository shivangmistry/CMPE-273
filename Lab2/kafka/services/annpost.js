var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    const announcement = {
        aname: msg.aname,
        adesc: msg.adesc,
        adate: msg.atime
    }
    Course.findOneAndUpdate({"info._id": msg.id}, { $push: {announcement}}, (err, result) => {
        if (err) callback(err, {message: "error"})
        else callback(null, {message: "success"})
    })
};

exports.handle_request = handle_request;