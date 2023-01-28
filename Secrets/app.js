//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
// const encrypt =  require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

var findOrCreate = require("mongoose-findorcreate")

const app = express ();

app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(bodyParser. urlencoded({extended: true}))
app.use(session({
    secret: 'hehehehe',
    resave: false,
    saveUninitialized: false

}))
app.use(passport.initialize());
app.use(passport.session());


//connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/accountDB", {useNewUrlParser: true});


//set up user account database
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        // trim: true,
        // lowercase: true,
        // unique: true,
        // required: 'username address is required',
    },
    password: {
        type: String,
        // required: 'password address is required',
    },
    googleId: String,
    facebookId: String,
    secret: String
})
accountSchema.plugin(passportLocalMongoose);
accountSchema.plugin(findOrCreate);

//encrypt database
// accountSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const Accounts = mongoose.model('Accounts', accountSchema);

passport.use(Accounts.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  

passport.use(new GoogleStrategy({
    clientID: process.env.GG_CLIENT_ID,
    clientSecret: process.env.GG_SECRET_ID,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    Accounts.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_SECRET_ID,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    Accounts.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


//--------------------------- get request for page --------------------------------

app.get('/', function(req, res) {
    res.render('home')
})

app.get('/register', function(req, res) {
    res.render('register')
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (!err) {
            res.redirect('/')    
        }
    })
})

app.get('/secrets', function(req, res) {
    if (req.isAuthenticated()) {
        Accounts.find({ secret: { $ne:null } }, function(err, secrets) {
            if (!err) {
                res.render('secrets', {secretArray: secrets})
            }
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/submit', function(req, res) {
    res.render('submit')
})


// ------------------------------- Register and Login Page ------------------------------------

app.post('/register', function(req, res) {
    let username = req.body.username
    let password = req.body.password
    Accounts.register({username: username}, password, function(err, user) {
        if (err) {
            console.log(err)
            res.redirect('/register')
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets')
                console.log()
            })
        }
    })

    

    // //add new account to accountDB
    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     addNewAccount(username, hash, res)
    // });
})

app.post('/login', passport.authenticate('local', {
    session: true,
    successRedirect: '/secrets',
    failureRedirect: '/'
}));

// app.post('/login', function(req, res) {
//     let username = req.body.username
//     let password = req.body.password

//     const user = new Accounts({
//         username: username,
//         passport: password
//     })

//     req.login(user, function(err) {
//         if (err) {
//             console.error(err)
//         } else {
//             passport.authenticate('local')(req, res, function() {
//             res.redirect('/secrets')
//             })
//         }
//     })

//     // //check account in accountDB
//     // checkHashPW(username, password, res)

// })

//                                  ---------------------- Google Oauth -------------------------
app.get('/auth/google',
  passport.authenticate('google', { session: true, scope: ['profile'] }));


app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

//                                  ---------------------- Facebook Oauth -------------------------

app.get('/auth/facebook',
  passport.authenticate('facebook', { session: true }));

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect('/secrets');
  });

// ------------------------------------------------------- Web functions ------------------------------------------------------------

app.post('/submit', function(req, res) {
    let secretsText = req.body.secret
    let user_id = req.user._id
    
    //save add secret to user account
    addSecret(user_id, secretsText, res)
})




//-----------------------------------------------------------------------------------------------------------------------------------

app. listen (3000, function() {
    console.log("Server listening on port 3000")
})


//---------------------------------------------------------------- functionality ----------------------------------------------------

function addNewAccount(username, password, res) {
    const account = new Accounts({
        username: username,
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

function checkHashPW(username, password, res) {
    Accounts.findOne({username: username}, function(err, account) {
        if (err) {
            console.log(err)
        } else {
            if (account) {
                bcrypt.compare(password, account.password, function(err, result) {
                    if (result === true) {
                        res.render('secrets')
                        console.log('successfully login')
                    } else {
                        console.log('Password is wrong!')
                    }
                });
            } 
        }
    })
}

function addSecret(user_id, secret,res) {
    Accounts.findByIdAndUpdate(user_id, {secret: secret}, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('added new secret')
            res.redirect('secrets')
        }
    })
}