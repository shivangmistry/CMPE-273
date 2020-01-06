var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

port = 3001
origin = "http://localhost:3000"
// origin = "ec2-3-19-229-111.us-east-2.compute.amazonaws.com"

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(cors({origin}));

app.post("/",function(req,res){
    const op1 = Number(req.body.op1), op2 = Number(req.body.op2), op = req.body.operation;
    let returnObj = {}
    try{
        console.log("Operands from client: "+op1+", "+op2)
        if(op==="add")
            returnObj.output = op1+op2;
        else if(op==="sub")
            returnObj.output = op1-op2;
        else if(op==="mul")
            returnObj.output = op1*op2;
        else if(op==="div")
            returnObj.output = (op1/op2).toFixed(5);
    } catch(err){
        returnObj.output="";
    }
    res.json(returnObj);
});

app.listen(port,function(req,res){
    console.log("Server listening on port "+port)
});