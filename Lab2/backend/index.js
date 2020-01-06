var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
require('./mongoose');
// var User = require("./models/user");
// var Course = require("./models/course");
// var passport = require('passport');
// var jwt = require('jsonwebtoken');
var session = require('express-session');
// const jwtSecret = "This is a JWT Secret!";
const kafka = require("./kafka/client")

var filepath = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        filepath = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, filepath);
    }
});
var upload = multer({ storage: storage });

var app = express();
app.use(bodyParser.json());
app.set('view-engine','ejs');
app.use(cors({ origin: "http://localhost:3000"}));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'cmpe273_testing', 
    resave: true,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

// mongoose.connect("mongodb+srv://root:"+process.env.MONGO_ATLAS_PW+"@mycluster-dj38c.mongodb.net/test?retryWrites=true",
//     { useNewUrlParser: true }, (err) => {
//         if (err) console.log(err);
//         else console.log("Connected to MongoDB.")
//     });

    
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// var currentUser = {};
// var skip = 0;

app.post('/login', (req,res)=>{
    kafka.make_request('login', req.body, function (err, results) {
        console.log("Req.body: ",req.body);
        console.log("Backend result: ",results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // let user = {
    //     id: req.body.id,
    //     password: req.body.password
    // }

    // User.find({ _id: user.id }, (err, result) => {
    //     if (err || !result[0]) {
    //         returnObj.message = "nouser";
    //         res.json(returnObj);
    //     }
    //     else {
    //         // console.log(result[0].password);
    //         bcrypt.compare(user.password, result[0].password, (err, match) => {
    //             if(err || !match){
    //                 returnObj.message = "error";
    //                 res.json(returnObj);
    //             }else{
    //                 // use token
    //                 var token = "JWT"+jwt.sign(user, jwtSecret, {
    //                     expiresIn: 10080 // in seconds
    //                 });
    //                 // console.log(token);
    //                 currentUser.id = result[0].id;
    //                 currentUser.name = result[0].name;
    //                 currentUser.role = result[0].role;
    //                 currentUser.image = result[0].image;
    //                 currentUser.token = token;
    //                 returnObj.message = "success";
    //                 returnObj.data = result[0];
    //                 returnObj.token = token;
    //                 res.json(returnObj);
    //             }
    //         });
    //     }
    // });
});

app.post('/signup',(req,res)=>{
    kafka.make_request('signup', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // let id = req.body.id;
    // let name = req.body.name;
    // let email = req.body.email;
    // let password = req.body.password;
    // let role = req.body.role;
    // let saltRounds = 10;

    // new Promise((resolve,reject)=>{
    //     bcrypt.genSalt(saltRounds,(err,salt)=>{
    //         if(err) throw err;
    //         bcrypt.hash(password,salt,(err,encrypted)=>{
    //             if(err) reject(err.name);
    //             resolve(encrypted);
    //         })
    //     });
    // })
    // .then((value)=>{
    //     const user = new User({
    //         _id: id,
    //         name: name,
    //         email: email,
    //         password: value,
    //         role: role,
    //         image: "https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg"
    //     });
    //     user.save((err) => {
    //         if(err){
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else{
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     })
    // })
    // .catch((value) => {
    //     console.log(value);
    // })

});

app.get('/profile/:id', (req,res) => {
    kafka.make_request('profile', req.params, function (err, results) {
        console.log(req.params.id);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // User.findById(req.params.id, (err, result) => {
    //     // console.log(result)
    //     if(err) res.json({message: "error"})
    //     else{
    //         res.json({
    //             message: "success",
    //             data: result
    //         })
    //     }
    // })
});

app.post("/profile/edit",(req,res) => {
    kafka.make_request('profile_edit', req.params, function (err, results) {
        console.log(req.params.id);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // console.log(req.body);
    // let returnObj = {};
    // User.findByIdAndUpdate(currentUser.id, req.body, {new : true}, (err, todo) => {
    //     // console.log(todo);
    //     if(err){
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else{
    //         currentUser.image = req.body.image;
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // });
});

app.get("/people", (req, res) => {
    kafka.make_request('people', req.query, function (err, results) {
        console.log(req.query);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // console.log(req.query.page, req.query.limit)
    // let limit = Number(req.query.limit);
    // skip = limit*Number(req.query.page);
    // User.find({}, ["_id", "name", "image", "role"], {skip, limit}, (err, result) => {
    //     if(err) {
    //         console.log(err)
    //         res.json({ message: "error"});
    //     }
    //     else{
    //         res.json({
    //             message: "success",
    //             data: result
    //         })
    //     }
    // })
});

app.get("/conversations", (req, res) => {
    kafka.make_request('conversations', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // Message.find({$or: [{"id1": currentUser.id}, {"id2": currentUser.id}]}, (err, result) => {
    //     if(err){
    //         res.json({message: "error"})
    //     }
    //     else{
    //         res.json({
    //             message: "success",
    //             data: result
    //         })
    //     }
    // })
})

app.post("/conversations", (req, res) => {
    kafka.make_request('conversations_new', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // console.log(req.body)
    // const message = new Message({
    //     id1: req.body.from,
    //     id1name: currentUser.name,
    //     id2: req.body.to,
    //     sub: req.body.sub,
    //     msg: {
    //         from: currentUser.name,
    //         text: req.body.msg,
    //         time: req.body.time,
    //     }
    // })
    // User.findById(message.id2, ["_id", "name"], (err, result) => {
    //     if(err || !result || (result && message.id2===currentUser.id) || message.id1!==currentUser.id ) res.json({ message: "error"})
    //     else {
    //         message.id2name =  result.name;
    //         message.save((err) => {
    //             if(err) { 
    //                 res.json({ message: "error"})
    //             } else res.json({ message: "success"})
    //         })
    //     }
    // })
})

app.get("/conversations/:id/:sub", (req, res) => {
    kafka.make_request('get_conversations', req.params, function (err, results) {
        console.log(req.params);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // Message.findOne({$or: [{$and:[{"id1":currentUser.id},{"id2":req.params.id},{"sub":req.params.sub}]},{$and:[{"id1":req.params.id},{"id2":currentUser.id},{"sub":req.params.sub}]}]}, (err, result) => {
    //     if (err) {
    //         res.json({ message: "error" })
    //     }
    //     else {
    //         res.json({
    //             message: "success",
    //             data: result.msg
    //         })
    //     }
    // })
})

app.post("/conversations/:id/:sub", (req, res) => {
    req.params.msg = req.body;
    kafka.make_request('send_message', req.params, function (err, results) {
        console.log(req.params);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // const msg = req.body;
    // Message.findOneAndUpdate({ $or: [{ $and: [{ "id1": currentUser.id }, { "id2": req.params.id }, { "sub": req.params.sub }] }, { $and: [{ "id1": req.params.id }, { "id2": currentUser.id }, { "sub": req.params.sub }] }] }, {$push: {msg}}, (err, result) => {
    //     if(err) res.json({ message: "error"})
    //     else{
    //         res.json({ message: "success"})
    //     }
    // })
})

app.get("/course",(req,res)=>{
    kafka.make_request('course', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // if(currentUser.role==="faculty"){
    //     Course.find({ "info.fid": currentUser.id }, (err, result) => {
    //         // console.log(result);
    //         if(err){
    //             returnObj.message = "error";
    //             res.json(returnObj)
    //         }
    //         else{
    //             returnObj.message = "success";
    //             returnObj.data = result;
    //             res.json(returnObj);
    //         }
    //     })
    // }
    // else if(currentUser.role==="student"){
    //     Course.find({ "students.sid": currentUser.id }, (err, result) => {
    //         // console.log(result);
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj)
    //         }
    //         else {
    //             returnObj.message = "success";
    //             returnObj.data = result;
    //             res.json(returnObj);
    //         }
    //     })
    // } 
});

app.post("/course/new",(req,res) => {
    kafka.make_request('coursecreate', req.body, function (err, results) {
        console.log(req.body);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // const course = new Course({
    //     info : {
    //         _id: req.body.cid,
    //         fid: currentUser.id,
    //         cname: req.body.cname,
    //         cdept: req.body.cdept,
    //         cdesc: req.body.cdesc,
    //         croom: req.body.croom,
    //         ccap: req.body.ccap,
    //         cwait: req.body.cwait,
    //         cterm: req.body.cterm
    //     }
    // });
    // course.save((err) => {
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // })
});

app.get("/course/search",(req,res)=>{
    kafka.make_request('coursesearch', req.query, function (err, results) {
        console.log(req.query);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj ={};
    // let limit = Number(req.query.limit);
    // skip = limit * Number(req.query.page);
    // Course.find({}, ['info'], {skip, limit}, (err, result) => {
    //     // console.log(result);
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.message = "success";
    //         returnObj.data = result;
    //         res.json(returnObj);
    //     }
    // })
});

app.get("/course/:id/home",(req,res)=>{
    kafka.make_request('coursehome', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.find({"info._id" : req.params.id}, (err, result) => {
    //     // console.log(result);
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         if (currentUser.role === "student") {
    //             returnObj.status = "none";
    //             for(let stud of result[0].students){
    //                 if(stud.sid===currentUser.id){
    //                     returnObj.status = stud.status;
    //                     break;
    //                 }
    //             }
    //         }
    //         returnObj.message = "success";
    //         returnObj.data = result[0].info;
    //         res.json(returnObj);
    //     }
    // })
});

app.post("/course/:id/home",(req,res)=>{
    Object.assign(req.params, req.body)
    kafka.make_request('courseaction', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {},query="",fid="";
    // if(req.body.action==="enroll"||req.body.action==="waitlist"){
    //     const stud = {
    //         sid: currentUser.id,
    //         sname: currentUser.name,
    //         simage: currentUser.image,
    //         status: req.body.action
    //     }
    //     Course.findOneAndUpdate({ "info._id": req.params.id }, { $push:{ students:stud}}, (err) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     });
    // }
    // else if(req.body.action==="drop"){
    //     Course.findOneAndUpdate({ "info._id": req.params.id }, { $pull: { students: { sid : currentUser.id}}}, (err) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     })
    // }
});

app.get("/course/:id/people",(req,res)=>{
    kafka.make_request('coursepeople', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne({"info._id": req.params.id}, (err, result) =>{
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.message = "success";
    //         returnObj.data = result.students;
    //         res.json(returnObj);
    //     } 
    // })
});

app.post("/course/:id/people",(req,res)=>{
    kafka.make_request('courseenwt', req.body, function (err, results) {
        console.log(req.body);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj={}, code="";
    // if(req.body.action==="enroll"){
    //     query = "update class set stat='enroll' where cid='"+req.body.cid+"' and sid='"+req.body.id+"'";
    //     //generate permission code here
    //     let date = new Date();
    //     let ms = date.getMilliseconds();
    //     let y = date.getFullYear();
    //     let s = date.getSeconds();
    //     let m = date.getMonth();
    //     let min = date.getMinutes()
    //     let d = date.getDay();
    //     let h = date.getHours();
    //     let arr = [ms, y, s, m, min, d, h];
    //     code = arr.join("");
    //     returnObj.code = code;
    //     Course.findOneAndUpdate({ $and: [{"info._id": req.params.id},{"students.sid": req.body.id}]}, { $set: {"students.$.status": "enroll" } }, (err) => {
    //         if(err){
    //             returnObj.message = "error";
    //             res.json(returnObj)
    //         } else {
    //             returnObj.message = "success";
    //             res.json(returnObj)
    //         }
    //     });
    // }
    // else{
    //     Course.findOneAndUpdate({ "info._id": req.params.id }, { $pull: { students: { sid: req.body.id } } }, (err) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     });
    // }
});

app.get("/course/:id/announcement",(req,res)=>{
    kafka.make_request('annget', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne( {"info._id": req.params.id }, (err, result) => {
    //     // console.log(result);
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.data = result.announcement;
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // })
});

app.post("/course/:id/announcement/new",(req,res)=>{
    Object.assign(req.body, req.params);
    kafka.make_request('annpost', req.body, function (err, results) {
        console.log(req.body);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // const announcement = {
    //     aname: req.body.aname,
    //     adesc: req.body.adesc,
    //     adate: req.body.atime
    // }
    // Course.findOneAndUpdate({"info._id": req.params.id}, { $push: {announcement}}, (err, result) => {
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // })
});

app.get("/course/:id/announcement/:aname", (req, res) => {
    kafka.make_request('annid', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne( {"info._id": req.params.id}, (err, result) => {
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         for (let a of result.announcement) {
    //             if (a.aname === req.params.aname) {
    //                 returnObj.data = a;
    //                 break;
    //             }
    //         }
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // })
});

app.get("/course/:id/quiz",(req,res)=>{
    kafka.make_request('quiz', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //     // console.log(result.announcement);
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.data = result.quiz;
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // });
});

app.post("/course/:id/quiz/new",(req,res)=>{
    Object.assign(req.body, req.params)
    kafka.make_request('quizpost', req.body, function (err, results) {
        console.log(req.body);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {}, q= req.body;
    // const quiz = {
    //     qname: q.qname,
    //     q1: q.q1,
    //     op11: q.op11,
    //     op12: q.op12,
    //     op13: q.op13,
    //     op14: q.op14,
    //     cor1: q.cor1,
    //     q2: q.q2,
    //     op21: q.op21,
    //     op22: q.op22,
    //     op23: q.op23,
    //     op24: q.op24,
    //     cor2: q.cor2,
    //     d1: q.d1,
    //     d2: q.d2
    // }
    // Course.findOneAndUpdate({ "info._id": req.params.id }, { $push: { quiz } }, (err, result) => {
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // });
});

app.get("/course/:id/quiz/:qname",(req,res)=>{
    kafka.make_request('quizget', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {}, quiz = "";
    // if(currentUser.role==="student"){
    //     User.findById(currentUser.id, (err, result) => {
    //         result = result.submitted
    //         for(let r of result){
    //             if(r.typeof==="quiz" && r.typename===req.params.qname ){
    //                 returnObj.message = "taken";
    //                 break;
    //             }
    //         }
    //         if(returnObj.message && returnObj.message==="taken") res.json(returnObj);
    //         else{
    //             Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //                 if (err) {
    //                     returnObj.message = "error";
    //                     res.json(returnObj);
    //                 }
    //                 else {
    //                     for (let q of result.quiz) {
    //                         if (q.qname === req.params.qname) {
    //                             returnObj.data = q;
    //                             quiz = q;
    //                             break;
    //                         }
    //                     } 
    //                     let d = new Date();
    //                     d.y = d.getFullYear();
    //                     d.m = d.getMonth() + 1;
    //                     d.d = d.getDate();
    //                     d = d.y+"-"+d.m+"-"+d.d
    //                     var dateFrom = quiz.d1;
    //                     var dateTo = quiz.d2;
    //                     var dateCheck = d;

    //                     var d1 = dateFrom.split("-");
    //                     var d2 = dateTo.split("-");
    //                     var c = dateCheck.split("-");

    //                     var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
    //                     var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
    //                     var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

    //                     if(check > from && check < to) {
    //                         returnObj.message = "success";
    //                         res.json(returnObj);
    //                     }
    //                     else {
    //                         returnObj.message = "prohibited"
    //                         res.json(returnObj);
    //                     }
    //                 }
    //             })
    //         }
    //     })
    // }
    // else if(currentUser.role==="faculty"){
    //     Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             for (let q of result.quiz) {
    //                 if (q.qname === req.params.qname) {
    //                     returnObj.data = q;
    //                     quiz = q;
    //                     break;
    //                 }
    //             }
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     })
    // }
})

app.post("/course/:id/quiz/:qname", (req, res) => {
    Object.assign(req.params, req.body);
    kafka.make_request('quizsubmit', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {},score=0, quiz="";
    // Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         for (let a of result.quiz) {
    //             if (a.qname === req.params.qname) {
    //                 quiz = a;
    //                 break;
    //             }
    //         }
    //         if(quiz.cor1 === req.body.ans1) score++ ;
    //         if(quiz.cor2 === req.body.ans2) score++ ;
    //         score = score + "/2";
    //         const grade = {
    //             sid: currentUser.id,
    //             sname: currentUser.name,
    //             typeof: "quiz",
    //             typename: quiz.qname,
    //             grade: score
    //         }
    //         Course.findOneAndUpdate({ "info._id": req.params.id }, { $push: { grade } }, (err) => {
    //             if (err) {
    //                 returnObj.message = "error";
    //                 res.json(returnObj);
    //             }
    //             else {
    //                 User.findByIdAndUpdate( currentUser.id, { $push: { grade } }, (err) => {
    //                     if (err) {
    //                         returnObj.message = "error";
    //                         res.json(returnObj);
    //                     }
    //                     else {
    //                         const submitted = {
    //                             typeof: "quiz",
    //                             typename: quiz.qname
    //                         }
    //                         User.findByIdAndUpdate(currentUser.id, { $push: { submitted } }, (err) => {
    //                             if (err) {
    //                                 returnObj.message = "error";
    //                                 res.json(returnObj);
    //                             }
    //                             else {
    //                                 returnObj.message = "success";
    //                                 returnObj.data = score;
    //                                 res.json(returnObj);
    //                             }
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // })
});

app.get("/course/:id/grade",(req,res)=>{
    kafka.make_request('grade', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj={};
    // if(currentUser.role==="faculty"){
    //     Course.findOne( {"info._id": req.params.id}, (err,result) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.data = result.grade;
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     })
    // } else if(currentUser.role==="student"){
    //     User.findById(currentUser.id, (err, result) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.data = result.grade;
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     })
    // }
});

app.get("/course/:id/file", (req, res) => {
    kafka.make_request('fileget', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //     // console.log(result.announcement);
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.data = result.lecture;
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // });
});

app.post("/course/:id/file",upload.single('lecturefile'),(req,res)=>{
    req.file.params = req.params;
    req.file.filepath = filepath;
    kafka.make_request('filepost', req.file, function (err, results) {
        console.log(req.file);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {}
    // if(req.file){
    //     // console.log(req.file)
    //     const lecture = {
    //         fname: req.file.originalname,
    //         fpath: filepath
    //     }
    //     Course.findOneAndUpdate({ "info._id": req.params.id }, { $push: { lecture } }, (err, result) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     });
    // }
    // else{
    //     returnObj.message = "error";
    //     res.json(returnObj);
    // }
});

app.get("/course/:id/assignment", (req, res)=>{
    kafka.make_request('assignmentget', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //     // console.log(result.announcement);
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         returnObj.data = result.assignment;
    //         returnObj.message = "success";
    //         res.json(returnObj);
    //     }
    // });
})

app.get("/course/:id/assignment/:asname", (req, res) => {
    kafka.make_request('submission', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {};
    // Course.findOne({ "info._id": req.params.id }, (err, result) => {
    //     if (err) {
    //         returnObj.message = "error";
    //         res.json(returnObj);
    //     }
    //     else {
    //         result = result.submission;
    //         let data =[]
    //         for(let r of result){
    //             if(r.asname===req.params.asname){
    //                 data.push(r);
    //             }
    //         }
    //         returnObj.message = "success";
    //         returnObj.data = data;
    //         res.json(returnObj);
    //     }
    // });
});

app.post("/course/:id/assignment/new", upload.single('assignment'), (req, res)=>{
    req.file.params = req.params;
    req.file.filepath = filepath;
    kafka.make_request('assignment', req.file, function (err, results) {
        console.log(req.file);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // let returnObj = {}
    // if (req.file) {
    //     // console.log(req.file)
    //     const assignment = {
    //         asname: req.file.originalname,
    //         aspath: filepath
    //     }
    //     Course.findOneAndUpdate({ "info._id": req.params.id }, { $push: { assignment } }, (err, result) => {
    //         if (err) {
    //             returnObj.message = "error";
    //             res.json(returnObj);
    //         }
    //         else {
    //             returnObj.message = "success";
    //             res.json(returnObj);
    //         }
    //     });
    // }
    // else {
    //     returnObj.message = "error";
    //     res.json(returnObj);
    // }
});

app.post("/course/:id/assignment/:asname", upload.single('submission'), (req, res)=>{
    if(req.file) {
        req.params.file = req.file;
        req.params.filepath = filepath;
    }
    else req.params.body = req.body;
    kafka.make_request('subgrade', req.params, function (err, results) {
        console.log(req.params);
        console.log('In result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
    // if(currentUser.role==="student"){
    //     if (req.file) {
    //         const submission = {
    //             sid: currentUser.id,
    //             sname: currentUser.name,
    //             asname: req.params.asname,
    //             subname: req.file.originalname,
    //             subpath: filepath
    //         }
    //         Course.findOneAndUpdate({ "info._id": req.params.id }, { $push: { submission } }, (err, result) => {
    //             if (err) res.json({ message: "error" });
    //             else res.json({ message: "success" });
    //         });
    //     }
    //     else {
    //         res.json({ message: "error" });
    //     }
    // }
    // else{
    //     const grade = {
    //         sid: req.body.sid,
    //         sname: req.body.sname,
    //         typeof: "ass",
    //         typename: req.params.asname,
    //         grade: req.body.grade
    //     }
    //     Course.findOneAndUpdate({"info._id": req.params.id}, { $push: { grade }}, (err,result) => {
    //         if (err) res.json({ message: "error" });
    //         else {
    //             User.findByIdAndUpdate(req.body.sid, { $push: { grade } }, (err, result) => {
    //                 if (err) res.json({ message: "error" });
    //                 else res.json({ message: "success" });
    //             })
    //         }
    //     })
    // }
});

app.listen(3001, () => console.log("Server started on port 3001"));
module.exports = app;