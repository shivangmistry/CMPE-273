var User = require('../../backend/models/User');
require("../../backend/mongoose.js");
require("../../backend/mongoose.js");
const bcrypt = require('bcrypt');

function handle_request(msg, callback) {
    let id = msg.id;
    let name = msg.name;
    let email = msg.email;
    let password = msg.password;
    let role = msg.role;
    let saltRounds = 10;

    new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, encrypted) => {
                if (err) reject(err.name);
                resolve(encrypted);
            })
        });
    })
        .then((value) => {
            const user = new User({
                _id: id,
                name: name,
                email: email,
                password: value,
                role: role,
                image: "https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg"
            });
            user.save((err) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, "success");
                }
            })
        })
        .catch((value) => {
            console.log(value);
        }) 
};

exports.handle_request = handle_request;