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
    grade:[{
        sid: "String",
        sname: "String",
        cid: "String",
        typeof: "String",
        typename: "String",
        grade: "String" 
    }],
    submitted: [{
        cid: "String",
        typeof: "String",
        typename: "String"
    }]
}])

module.exports = mongoose.model("User", userSchema)