const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { default: rateLimit } = require('express-rate-limit');


const userSchema = require('./models/users');
const { default: mongoose } = require('mongoose');

const apiLimiterVariables = {
    minutes: 10,
    maximumCallsAllowedWithinSetTime: 100,
    errorMessage: function(){ return `Too many requests from this IP, please try again after ${this.minutes} minutes`}
};

const limiter = rateLimit({
    windowMs: apiLimiterVariables.minutes * 60 * 1000,
    max: apiLimiterVariables.maximumCallsAllowedWithinSetTime,
    message: apiLimiterVariables.errorMessage()
});

function logTime(req,res,next) {
    const dateObject = new Date();
    console.log(dateObject.getTime());
    next();
};

function parseNumberString(string) {
    const str = parseInt(string);
    if(str) {
        return str
    }else {
        return string
    }
};

// app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logTime);
app.use(limiter);
app.use(bodyParser.json());

app.get('/users',async (req,res)=>{
    let {limit, offset} = req.query;
    if(!limit) {
        limit = 5
    } 
    const users = await userSchema.find({}).skip(offset).limit(limit);
    res.send(users);
});

app.get('/users/:fieldName/:fieldValue',async (req,res)=>{
    let {fieldName,fieldValue} = req.params;
    let {limit, offset} = req.query;
    console.log(req.query);
    if(!limit) {
        limit = 5
    } 

    if(fieldName==='id') {
        fieldValue = parseNumberString(fieldValue);
    }
    const user = await userSchema.find({[fieldName]:fieldValue}).skip(offset).limit(limit);

    if(user) {
        res.send(user);
    }else{
        res.status(404).send('User not found');
    }
});

app.listen(process.env.PORT);