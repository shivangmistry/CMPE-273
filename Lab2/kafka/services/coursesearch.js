var Course = require('../../backend/models/Course');
require("../../backend/mongoose.js");

function handle_request(msg, callback) {
    let limit = Number(msg.limit);
    let skip = limit * Number(msg.page);
    Course.find({}, ['info'], {skip, limit}, (err, result) => {
        if (err) {
            console.log(err)
            callback(err, { message: "error" });
        }
        else {
            callback(null, {
                message: "success",
                data: result
            })
        }
    })
};

exports.handle_request = handle_request;