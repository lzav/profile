const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const LocalStrategy= require('passport-local');
const User = require('../models/user');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');


// PASSPORT SETUP

// GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // find or create user, then call done with done(err, user)
 
    User.findOne({googleID: profile.id})
        .then(foundUser => {
            // User found
            if (foundUser) {
                done(null, foundUser);
            } else {            
            // User not found: add to db
                User.create({
                    displayName: profile.displayName,
                    googleID: profile.id
                })
                    .then(savedUser => {
                        console.log('New user saved to db: ' + savedUser);
                        done(null, savedUser);
                    })

            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
  }
));
// EOF GOOGLE


// FACEBOOK
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {    
    
    User.findOne({facebookID: profile.id})
        .then(foundUser => {
            // User found
            if (foundUser) {
                done(null, foundUser);
            } else {            
            // User not found: add to db
                User.create({
                    displayName: profile.displayName,
                    googleID: profile.id
                })
                    .then(savedUser => {
                        console.log('New user saved to db: ' + savedUser);
                        done(null, savedUser);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
  }
));
// EOF FACEBOOK


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',    
},    

    (username, password, done) => {
        
        User.findOne({email: username})
            .then(foundUser => {
                
                // User not found: redirect to login
                if (!foundUser) {                
                    console.log('User not found');    
                    return done(null, false);
                } 

                // Check confirmed registration through email
                if (foundUser.confirmed === false) {
                    console.log('User has not confirmed registration');
                    return done(null, false);
                }
               
                // User found: check password
                bcrypt.compare(password, foundUser.password)
                    .then(result => {
                        if(!result) {
                            // PASSWORDS DO NOT MATCH
                            // console.log("Passwords do not match");
                            return done(null, false);
                        }
                        // PASSWORDS MATCH
                        // console.log('User found and passwords match');
                        return done(null, foundUser);
                    })
            })
            .catch(err => {
                // flash message something went wrong. Please try again later
                console.log(err);
                res.redirect('/auth/login');
            });
    }
  ));
// EOF LOCAL STRATEGY

passport.serializeUser((user, done) => {
    done(null, user.id);
  }
);
  
passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    }
);