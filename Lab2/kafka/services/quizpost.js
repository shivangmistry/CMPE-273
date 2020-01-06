var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    let q = msg;
    const quiz = {
        qname: q.qname,
        q1: q.q1,
        op11: q.op11,
        op12: q.op12,
        op13: q.op13,
        op14: q.op14,
        cor1: q.cor1,
        q2: q.q2,
        op21: q.op21,
        op22: q.op22,
        op23: q.op23,
        op24: q.op24,
        cor2: q.cor2,
        d1: q.d1,
        d2: q.d2
    }
    Course.findOneAndUpdate({ "info._id": msg.id }, { $push: { quiz } }, (err, result) => {
        if (err) callback(err, {message: "error"});
        else callback(null, {message: "success"});
    });
};

exports.handle_request = handle_request;