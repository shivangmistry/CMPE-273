var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    if(msg){
        const lecture = {
            fname: msg.originalname,
            fpath: msg.filepath
        }
        console.log("*****",lecture.fpath);
        Course.findOneAndUpdate({ "info._id": msg.params.id }, { $push: { lecture } }, (err, result) => {
            if (err) callback(err, { message: "error" })
            else callback(null, { message: "success" })
        });
    }
    else callback(null, {message:"error"})
};

exports.handle_request = handle_request;