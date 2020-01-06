var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    const course = new Course({
        info : {
            _id: msg.cid,
            fid: currentUser.id,
            cname: msg.cname,
            cdept: msg.cdept,
            cdesc: msg.cdesc,
            croom: msg.croom,
            ccap: msg.ccap,
            cwait: msg.cwait,
            cterm: msg.cterm
        }
    });
    course.save((err) => {
        if (err) callback(err, {message: "error"});
        else callback(null, {message: "success"});
    })
};

exports.handle_request = handle_request;