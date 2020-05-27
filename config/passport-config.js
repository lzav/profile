const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const keys = require('../config/keys');


// PASSPORT SETUP

passport.use(new GoogleStrategy({
    clientID: keys.passport.google.clientID,
    clientSecret: keys.passport.google.clientSecret,
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
                    username: profile.displayName,
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
        })
  }
));


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