var Message = require('../../backend/models/Message');
var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");
var currentUser = cu.getUser();

function handle_request(msg, callback) {
    const message = new Message({
        id1: msg.from,
        id1name: currentUser.name,
        id2: msg.to,
        sub: msg.sub,
        msg: {
            from: currentUser.name,
            text: msg.msg,
            time: msg.time,
        }
    })
    User.findById(message.id2, ["_id", "name"], (err, result) => {
        if(err || !result || (result && message.id2===currentUser.id) || message.id1!==currentUser.id ) callback(err, { message: "error"})
        else {
            message.id2name =  result.name;
            message.save((err) => {
                if(err) { 
                    callback(err, { message: "error"})
                } else callback(null, { message: "success"})
            })
        }
    })
};

exports.handle_request = handle_request;