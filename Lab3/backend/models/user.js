const mongoose = require('mongoose');

const userSchema = new mongoose.Schema([{
    _id: String,
    name: String,
    email: String,
    password: String,
    role: String,
    image: String,
    cno: String,
    city: String,
    country: String,
    company: String,
    school: String,
    hometown: String,
    gender: String,
    about: String,
    language: String,
    courses: [ String ]
}])

module.exports = mongoose.model("User", userSchema)