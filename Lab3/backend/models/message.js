const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema([{
    id1: String,
    id1name: String,
    id2: String,
    id2name: String,
    sub: String,
    msg: [{
        from: String,
        text: String,
        time: String
    }]
}])

module.exports = mongoose.model("Message", messageSchema)