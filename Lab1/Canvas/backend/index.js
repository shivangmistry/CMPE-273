var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
// var session = require('express-session');
var bcrypt = require('bcrypt');
var multer = require('multer');
var path = require('path');

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
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.static(__dirname + '/public'));
// app.use(session({
//     secret:"mysecret",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{secure:false}
// }));

var con = mysql.createConnection({
    // connectionLimit: 100,
    host:"localhost",
    user:"root",
    password:"password",
    database:"sys"
});
con.connect((err) => {
    if(err) console.log(err.code);
    else console.log("Database connection successful.");
});

//connection pooling
// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "sys"
// })

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });

var currentUser = {};
// currentUser.role = "faculty";
// currentUser.id = "101";

app.post('/login',(req,res)=>{
    let returnObj = {};
    let id = req.body.id;   
    let password = req.body.password;
    let encrypted = "";
    //query
    let query = "select * from user where id='"+id+"'";

    new Promise((resolve,reject)=>{
        con.query(query, (err, result) => {
            if(!result[0]){
                returnObj.message = "nouser";
                res.json(returnObj);
            }        
            // console.log(result);
            // encrypted = result[0].password;
            resolve(result[0]);
            // resolve([encrypted,result[0].role]);
        });
    })
    .then((value)=>{
        new Promise((resolve, reject) => {
            bcrypt.compare(password, value.password, (err, result) => {
            // bcrypt.compare(password, value[0], (err, result) => {
                if (err) throw err;
                resolve([result,value]);
            });
        })
        .then((value) => {
            if (value[0]) {
                returnObj.message = "success";
                currentUser.id = id;
                currentUser.role = value[1].role;
                // returnObj.id = id;
                returnObj.data = value[1];
            }
            else {
                returnObj.message = "error";
            }
            res.json(returnObj);
        });
    });
});

app.post('/signup',(req,res)=>{
    let returnObj = {};
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let saltRounds = 10;

    new Promise((resolve,reject)=>{
        bcrypt.genSalt(saltRounds,(err,salt)=>{
            if(err) throw err;
            bcrypt.hash(password,salt,(err,encrypted)=>{
                if(err) throw err;
                resolve(encrypted);
            })
        });
    })
    .then((value)=>{
        //query
        let query = "insert into user (id, name, email, password, role) values ('" + id + "', '" + name + "', '" + email + "', '" + value + "', '" + role + "')";
        // console.log(id,name,email,value,role);
        con.query(query, (err,result)=>{
            if(err){
                returnObj.message = "error";
                res.json(returnObj);
            }
            // console.log("Row affected: "+result.affectedRows);
            if(result.affectedRows===1){
                returnObj.message = "success";
                res.json(returnObj);
            }
        });
    })
});

app.get('/profile', (req,res) => {
    let returnObj = {};
    let query = "select * from user where id='" + currentUser.id + "'";
    con.query(query,(err,result)=>{
        // console.log(result[0]);
        if(err) throw err;
        returnObj.data = result[0];
        res.json(returnObj);
    });
});

app.post("/profile/edit",(req,res) => {
    let returnObj = {}
    let user = {
        image: req.body.image,
        cno: req.body.cno,
        about: req.body.about,
        city: req.body.city,
        country: req.body.country,
        company: req.body.company,
        school: req.body.school,
        hometown: req.body.hometown,
        language: req.body.language,
        gender: req.body.gender
    }
    query = "update user set image='"+user.image+"',cno='"+user.cno+"',about='"+user.about+"',city='"+user.city+"',country='"+user.country+"',company='"+user.company+"',school='"+user.school+"',hometown='"+user.hometown+"',language='"+user.language+"',gender='"+user.gender+"' where id='"+currentUser.id+"'";
    // console.log(user.image,user.cno,user.about,user.city,user.country,user.company,user.school,user.hometown,user.language,user.gender);
    con.query(query,(err,result)=>{
        if(err){
            returnObj.message="error";
        }
        else if(result.affectedRows===1){
            // console.log("Rows affected: "+result.affectedRows);
            returnObj.message = "success";
            res.json(returnObj);
        }
    });
});

app.get("/course",(req,res)=>{
    let returnObj = {}, query = "";
    if(currentUser.role==="faculty"){
        query = "select cid,cname,cterm from course where fid = '" + currentUser.id+ "'";
    }
    else if(currentUser.role==="student"){
        query = "select cid,cname,cterm from course where cid in ( select cid from class where sid = '" + currentUser.id+"' )"; 
    }   
    con.query(query,(err,result)=>{
        // console.log(result);
        if(err){
            returnObj.message = "error";
            res.json(returnObj);
        }
        else{
            returnObj.message = "success";
            returnObj.data = result;
            res.json(returnObj);   
        }
    }); 
});

// sql pooling
// app.get("/course",(req,res)=>{
//    let returnObj = {}, query="";
//    if(currentUser.role==="faculty"){
//        query = "select cid,cname,cterm from course where fid = '" + currentUser.id + "'";
//    }
//    else if(currentUser.role==="student"){
//        query = "select cid,cname,cterm from course where cid in ( select cid from class where sid = '"+currentUser.id+"' )"; 
//    }  
//     pool.query(query, (err, result) => {
//             // console.log(result);
//             if (err) {
//                 returnObj.message = "error";
//                 res.json(returnObj);
//             }
//             returnObj.message = "success";
//             returnObj.data = result;
//             res.json(returnObj);
//     }); 
     
// });

app.post("/course/new",(req,res) => {
    let returnObj = {};
    let course = req.body;
    let query = "insert into course (cid,fid,cname,cdept,cdesc,croom,ccap,cwait,cterm) values ('" + course.cid + "','" + currentUser.id + "','" + course.cname + "','" + course.cdept + "','" + course.cdesc + "','" + course.croom + "'," + Number(course.ccap) + "," + Number(course.cwait) + ",'" + course.cterm + "')";
    // console.log(course.cid, course.cname, course.cdept, course.cdesc, course.croom, course.ccap, course.cwait, course.cterm);
    con.query(query,(err,result)=>{
        if(err){
            returnObj.message="error";
            res.json(returnObj);
        }
        else if(result.affectedRows===1){
            // console.log("Rows affected: "+result.affectedRows)
            returnObj.message="success";
            res.json(returnObj);
        }
    });
});

app.get("/course/search",(req,res)=>{
    let returnObj ={}
    let query = "select cid,cname,cterm from course where cid not in (select cid from class where sid='"+currentUser.id+"')";
    con.query(query,(err,result)=>{
        // console.log(result);
        if(err) throw err;
        returnObj.courses = result;
        res.json(returnObj);
    });
});

app.get("/course/:id/home",(req,res)=>{
    let returnObj = {};
    let query1 = "select * from course where cid = '" + req.params.id + "'";
    if (currentUser.role === "student") {
        let query2 = "select stat from class where cid = '" + req.params.id + "' and sid='" + currentUser.id + "'";
        con.query(query2, (err, result) => {
            if (!result[0]) {
                returnObj.status = "none";
            }
            else if (result) {
                returnObj.status = result[0].stat;
            }
        });
    }
    con.query(query1,(err,result)=>{
    // console.log(result);
    if(err){
        returnObj.message = "error";
        res.json(returnObj);
    }
    returnObj.message = "success";
    returnObj.data = result[0];
    res.json(returnObj);
    })
});

app.post("/course/:id/home",(req,res)=>{
    let returnObj = {},query="",fid="";
    if(req.body.action==="enroll"||req.body.action==="waitlist"){
        new Promise((resolve,reject)=>{
            con.query("select fid from course where cid='"+req.params.id+"'",(err,result)=>{
                fid=result[0].fid;
                resolve([req.params.id,fid,req.body.action]);
            })
        })
        .then((value)=>{
            query = "insert into class (cid,fid,sid,stat) values ('"+value[0]+"','"+value[1]+"','"+currentUser.id+"','"+value[2]+"');";
            con.query(query,(err,result)=>{
                if(err){
                    returnObj.message="error";
                    res.json(returnObj);
                }
                returnObj.message = "success";
                res.json(returnObj);
            })
        })
    }
    else if(req.body.action==="drop"){
        query="delete from class where sid='"+currentUser.id+"' and cid='"+req.params.id+"'";
        con.query(query,(err,result)=>{
            if(err){
                returnObj.message = "error";
                res.json(returnObj);
            }
            else if(result.affectedRows===1){
                returnObj.message = "success";
                res.json(returnObj);
            }
        });
    }
});

app.get("/course/:id/people",(req,res)=>{
    let returnObj = {},query="";
    if(currentUser.role==="faculty"){
        query = "select user.id,user.name, user.image, class.stat from user, class where user.id=class.sid and class.cid='" + req.params.id + "'";
    }
    else{
        query = "select user.id,user.name, user.image from user, class where user.id=class.sid and class.stat='enroll' and class.cid='" + req.params.id + "'";
    }
    con.query(query,(err,result)=>{
        if(err){
            returnObj.message="error";
            res.json(returnObj);
        }
        // console.log(result);
        returnObj.message = "success";
        returnObj.people = result;
        res.json(returnObj);
    });
});

app.post("/course/:id/people",(req,res)=>{
    let returnObj={}, query="",code="";
    if(req.body.action==="enroll"){
        query = "update class set stat='enroll' where cid='"+req.body.cid+"' and sid='"+req.body.id+"'";
        //generate permission code here
        let date = new Date();
        let ms = date.getMilliseconds();
        let y = date.getFullYear();
        let s = date.getSeconds();
        let m = date.getMonth();
        let min = date.getMinutes()
        let d = date.getDay();
        let h = date.getHours();
        let arr = [ms, y, s, m, min, d, h];
        code = arr.join("");
    }
    else if(req.body.action==="remove"){
        query = "delete from class where cid='"+req.body.cid+"' and sid='"+req.body.id+"'";
    }
    con.query(query,(err,result)=>{
        // console.log(result);
        if(err){
            returnObj.message="error";
            res.json(returnObj);
        }
        if(result.affectedRows===1){
            returnObj.message="success";
            returnObj.code = code;
            res.json(returnObj);
        }
    });
});

app.get("/course/:id/announcement",(req,res)=>{
    let returnObj = {};
    let query = "select * from announcement where cid='"+req.params.id+"'";
    con.query(query,(err,result)=>{
        if(err){
            returnObj.message = "error";
            res.json(returnObj);
        }
        // console.log(result);
        returnObj.message = "success";
        returnObj.data = result;
        res.json(returnObj);
    });
});

app.post("/course/:id/announcement/new",(req,res)=>{
    let returnObj = {};
    let query = "insert into announcement (cid,aname,adesc,atime) values ('"+req.body.cid+"','"+req.body.aname+"','"+req.body.adesc+"','"+req.body.atime+"')";
    // console.log(req.body.aname,req.body.adesc,req.body.atime)
    con.query(query,(err,result)=>{
        if(err){
            // console.log(err.name)
            returnObj.message = "error";
            res.json(returnObj);
        }
        else if(result.affectedRows===1){
            // console.log("Rows affected: "+result.affectedRows);
            returnObj.message = "success";
            res.json(returnObj);
        }
    });
});

app.get("/course/:id/announcement/:aname", (req, res) => {
    let returnObj = {};
    let query = "select * from announcement where cid='" + req.params.id + "' and aname='"+req.params.aname+"'";
    con.query(query, (err, result) => {
        if (err) {
            returnObj.message = "error";
            res.json(returnObj);
        }
        // console.log(result);
        returnObj.message = "success";
        returnObj.data = result[0];
        res.json(returnObj);
    });
});

app.get("/course/:id/quiz",(req,res)=>{
    let returnObj = {};
    let query = "select qid,qname from quiz where cid='"+req.params.id+"'";
    con.query(query, (err, result) => {
        if (err) {
            returnObj.message = "error";
            res.json(returnObj);
        }
        // console.log(result)
        returnObj.message = "success";
        returnObj.data = result;
        res.json(returnObj);
    });
});

app.post("/course/:id/quiz/new",(req,res)=>{
    let returnObj = {}, q= req.body;
    let query = "insert into quiz (cid,qid,qname,q1,op11,op12,op13,op14,cor1,q2,op21,op22,op23,op24,cor2,d1,d2) values ('"+req.params.id+"','"+q.qid+"','"+q.qname+"','"+q.q1+"','"+q.op11+"','"+q.op12+"','"+q.op13+"','"+q.op14+"','"+q.cor1+"','"+q.q2+"','"+q.op21+"','"+q.op22+"','"+q.op23+"','"+q.op24+"','"+q.cor2+"','"+q.d1+"','"+q.d2+"')";
    con.query(query,(err,result)=>{
        if(err){
            returnObj.message = "error";
            res.json(returnObj);
        }
        // console.log(result);
        returnObj.message = "success";
        res.json(returnObj);
    });
});

app.get("/course/:id/quiz/:qid",(req,res)=>{
    let returnObj = {};
    let query = "select * from quiz where cid='"+req.params.id+"' and qid='"+req.params.qid+"'"
    con.query(query,(err,result)=>{
        if (err) {
            returnObj.message = "error";
            res.json(returnObj);
        }
        // console.log(result);
        returnObj.message = "success";
        returnObj.data = result[0];
        res.json(returnObj);
    });
})

app.post("/course/:id/quiz/:qid", (req, res) => {
    let returnObj = {},score=0;
    let query = "select cor1, cor2 from quiz where cid='"+req.params.id+"' and qid='"+req.params.qid+"'";
    con.query(query,(err,result)=>{
        // console.log("Answers: "+req.body.ans1,req.body.ans2);
        // console.log(result);
        if(err){
            returnObj.message="error";
            res.json(returnObj);
        }
        new Promise((resolve,reject)=>{
            if (result[0].cor1 === req.body.ans1) {
                score++;
            }
            if (result[0].cor2 === req.body.ans2) {
                score++;
            }
            resolve(score)
        })
        .then((value)=>{
            let query1 = "insert into grade (cid,sid,typeof,typeid,grade) values ('"+req.params.id+"','"+currentUser.id+"','quiz','"+req.params.qid+"','"+value+"')"
            con.query(query1,(err,result)=>{
                if(result.affectedRows!==1){
                    returnObj.message = "error";
                    res.json(returnObj);
                }
            });
            returnObj.message="success";
            returnObj.data=value;
            res.json(returnObj);
        })
    })
});

app.get("/course/:id/grade",(req,res)=>{
    let returnObj={}, query1="", query2= "";
    if(currentUser.role==="faculty"){
        query1 = "select * from grade where cid='" + req.params.id + "'";
    } else if(currentUser.role==="student"){
        query1 = "select * from grade where cid='"+req.params.id+"' and sid='"+currentUser.id+"'";
    }
    con.query(query1, (err,result)=>{
        // console.log(result);
        if(err){
            returnObj.message = "error";
            res.json(returnObj);
        }
        returnObj.grades = result;
        returnObj.message = "success";
        res.json(returnObj);
    });
});

app.get("/course/:id/file", (req, res) => {
    let returnObj = {};
    let query = "select * from lecture where cid='"+req.params.id+"'";
    con.query(query, (err, result) => {
        // console.log(result);
        if(err){
            returnObj.message = "error";
            res.json(returnObj);
        }
        returnObj.data = result;
        returnObj.message = "success";
        res.json(returnObj);
    });
});

app.post("/course/:id/file",upload.single('lecturefile'),(req,res)=>{
    if(req.file){
        // console.log(req.file);
        let query = "insert into lecture (cid,fname,fpath) values('"+req.params.id+"','"+req.file.originalname+"','"+filepath+"')";
        con.query(query, (err,result) => {
            // console.log(result);
            if(err) res.send("error");
            else if(result.affectedRows===1) res.send("success");
        })
    }
    else{
        res.send("error");
    }
});

app.get("/course/:id/assignment", (req, res)=>{
    let returnObj = {};
    let query = "select * from assignment where cid='" + req.params.id + "'";
    con.query(query, (err, result) => {
        // console.log(result)
        if (err) {
            returnObj.message = "error";
            res.json(returnObj);
        }
        returnObj.data = result;
        returnObj.message = "success";
        res.json(returnObj);
    });
})

app.get("/course/:id/assignment/:asname", (req, res) => {
    let returnObj = {};
    let query = "select sid,subname,subpath from submission where cid='" + req.params.id + "' and asname='" + req.params.asname + "'";
    con.query(query, (err, result) => {
        // console.log(result);
        if (err) {
            returnObj.message = "error";
            res.json(returnObj);
        }
        returnObj.data = result;
        returnObj.message = "success";
        res.json(returnObj);
    });
});

app.post("/course/:id/assignment/new", upload.single('assignment'), (req, res)=>{
    // console.log(req.file);
    if (req.file) {
        let query = "insert into assignment (cid,asname,aspath) values('" + req.params.id + "','" + req.file.originalname + "','" + filepath + "')";
        con.query(query, (err, result) => {
            if (err) res.send("error");
            else if (result.affectedRows === 1) res.send("success");
        })
    }
    else {
        res.json({message:"error"});
    }
});

app.post("/course/:id/assignment/:asid", upload.single('submission'), (req, res)=>{
    // console.log(req.file);
    if(currentUser.role==="student"){
        if (req.file) {
            let query = "insert into submission (cid,sid,asname,subname,subpath) values('" + req.params.id + "','" + currentUser.id + "','" + req.params.asid + "','" + req.file.originalname + "','" + filepath + "')";
            con.query(query, (err, result) => {
                // console.log(result)
                if (err) res.send("error");
                else if (result.affectedRows === 1) res.send("success");
            })
        }
        else {
            res.json({ message: "error" });
        }
    }
    else{
        // console.log(req.body);
        let returnObj = {};
        let query = "insert into grade (cid,sid,typeof,typeid,grade) values ('" + req.params.id + "','" + req.body.sid + "','ass','" + req.params.asid + "','" + req.body.grade + "')"
        con.query(query, (err,result)=>{
            // console.log(result);
            if(err){
                returnObj.message="error";
                res.json(returnObj);
            }
            returnObj.message="success";
            res.json(returnObj);
        })
    }
    
});

// app.listen(3001);
app.listen(3001, () => console.log("Server started on port 3001"));
module.exports = app;