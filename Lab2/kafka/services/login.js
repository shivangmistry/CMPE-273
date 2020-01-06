var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
var cu = require("../api/data");

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwtSecret = "This is a JWT Secret!";

function handle_request(msg, callback) {
    let returnObj = {};
    let user = {
        id: msg.id,
        password: msg.password
    }
    User.findById(user.id, (err, result) => {
        if (err || !result) {
            callback(err, {message: "nouser"});
        }
        else {
            user.role = result.role;
            user.image = result.image;
            bcrypt.compare(user.password, result.password, (err, match) => {
                if (err || !match) {
                    callback(err, {message: "error"});
                } else {
                    // use token
                    var token = "JWT" + jwt.sign(user, jwtSecret, {
                        expiresIn: 10080 // in seconds
                    });
                    console.log(token)
                    let currentUser = {};
                    currentUser.id = result.id;
                    currentUser.name = result.name;
                    currentUser.role = result.role;
                    currentUser.image = result.image;
                    currentUser.token = token;
                    cu.setUser(currentUser);
                    returnObj.message = "success";
                    returnObj.data = result;
                    returnObj.token = token;
                    callback(null, returnObj);
                }
            });
        }
    });
};

exports.handle_request = handle_request;