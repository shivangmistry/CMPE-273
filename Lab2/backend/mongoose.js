var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb+srv://shivani:shivani@cluster0-50hvz.mongodb.net/test?retryWrites=truee', { useNewUrlParser: true, poolSize: 100 }, (err) => {
//     if (err) throw err;
//     console.log("mongoose server running");
// });

mongoose.connect("mongodb+srv://root:root%40password@mycluster-dj38c.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true, poolSize: 100 }, (err) => {
        if (err) console.log(err);
        else console.log("Connected to MongoDB.")
    });

module.exports = { mongoose };