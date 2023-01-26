//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const encrypt =  require('mongoose-encryption');

const app = express ();

app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(bodyParser. urlencoded({extended: true}))
//connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/accountDB", {useNewUrlParser: true});

//set up user account database
const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    password: {
        type: String,
        required: 'Password is required'
    }
})

//encrypt database
const secret = 'sthsecret'
accountSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const Accounts = mongoose.model('Accounts', accountSchema);

//--------------------------- get request for page --------------------------------

app.get('/', function(req, res) {
    res.render('home')
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/register', function(req, res) {
    res.render('register')
})

// ------------------------------- Post request ------------------------------------

app.post('/register', function(req, res) {
    let email = req.body.email
    let password = req.body.password

    //add new account to accountDB
    addNewAccount(email, password, res)
})

app.post('/login', function(req, res) {
    let email = req.body.email
    let password = req.body.password

    //check account in accountDB
    checkAccount(email, password, res)
    
})








app. listen (3000, function() {
    console.log("Server listening on port 3000")
})


//---------------------------------------------------------------- functionality ----------------------------------------------------

function addNewAccount(email, password, res) {
    const account = new Accounts({
        email: email,
        password: password
    })
    account.save(function(err) {
        if (err) {
            console.log(err)
        } else {
            res.render('secrets')
            console.log('successfully register new account')
        }
    })
}

function checkAccount(email, password, res) {
    Accounts.findOne({email: email}, function(err, account) {
        if (err) {
            console.log(err)
        } else {
            if (password === account.password) {
                res.render('secrets')
                console.log('successfully login')
            } else {
                console.log('Password is wrong!')
            }
        }
    })
}