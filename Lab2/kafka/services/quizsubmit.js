var Course = require('../../backend/models/Course');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    let returnObj = {}, score = 0, quiz = "";
    Course.findOne({ "info._id": msg.id }, (err, result) => {
        if (err) callback(err, {message: "error"})
        else {
            for (let a of result.quiz) {
                if (a.qname === msg.qname) {
                    quiz = a;
                    break;
                }
            }
            if(quiz.cor1 === msg.ans1) score++ ;
            if(quiz.cor2 === msg.ans2) score++ ;
            score = score + "/2";
            const grade = {
                sid: currentUser.id,
                sname: currentUser.name,
                cid: msg.id,
                typeof: "quiz",
                typename: quiz.qname,
                grade: score
            }
            Course.findOneAndUpdate({ "info._id": msg.id }, { $push: { grade } }, (err) => {
                if (err) callback(err, { message: "error" })
                else {
                    User.findByIdAndUpdate( currentUser.id, { $push: { grade } }, (err) => {
                        if (err) callback(err, { message: "error" })
                        else {
                            const submitted = {
                                cid: msg.id,
                                typeof: "quiz",
                                typename: quiz.qname
                            }
                            User.findByIdAndUpdate(currentUser.id, { $push: { submitted } }, (err) => {
                                if (err) callback(err, { message: "error" })
                                else {
                                    returnObj.message = "success";
                                    returnObj.data = score;
                                    callback(null, returnObj);
                                }
                            });
                        }
                    });
                }
            });
        }
    })
};

exports.handle_request = handle_request;