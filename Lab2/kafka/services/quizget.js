var Course = require('../../backend/models/Course');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");
currentUser = cu.getUser();

function handle_request(msg, callback) {
    let returnObj = {}, quiz = "";
    if(currentUser.role==="student"){
        User.findById(currentUser.id, (err, result) => {
            result = result.submitted
            for(let r of result){
                if(r.cid===msg.id && r.typeof==="quiz" && r.typename===msg.qname ){
                    returnObj.message = "taken";
                    break;
                }
            }
            if(returnObj.message && returnObj.message==="taken") callback(null, returnObj);
            else{
                Course.findOne({ "info._id": msg.id }, (err, result) => {
                    if (err) callback(err, {message: "error"})
                    else {
                        for (let q of result.quiz) {
                            if (q.qname === msg.qname) {
                                returnObj.data = q;
                                quiz = q;
                                break;
                            }
                        } 
                        let d = new Date();
                        d.y = d.getFullYear();
                        d.m = d.getMonth() + 1;
                        d.d = d.getDate();
                        d = d.y+"-"+d.m+"-"+d.d
                        var dateFrom = quiz.d1;
                        var dateTo = quiz.d2;
                        var dateCheck = d;

                        var d1 = dateFrom.split("-");
                        var d2 = dateTo.split("-");
                        var c = dateCheck.split("-");

                        var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
                        var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
                        var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

                        if(check > from && check < to) {
                            returnObj.message = "success";
                            callback(null, returnObj);
                        }
                        else {
                            returnObj.message = "prohibited"
                            callback(null, returnObj);
                        }
                    }
                })
            }
        })
    }
    else if(currentUser.role==="faculty"){
        Course.findOne({ "info._id": msg.id }, (err, result) => {
            if (err) callback(err, {message: "error"})
            else {
                for (let q of result.quiz) {
                    if (q.qname === msg.qname) {
                        returnObj.data = q;
                        quiz = q;
                        break;
                    }
                }
                returnObj.message = "success";
                callback(null, returnObj);
            }
        })
    }
};

exports.handle_request = handle_request;