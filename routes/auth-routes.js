const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// AUTH ROUTES

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logOut();    
    res.redirect('/');
});

// GOOGLE
router.get('/google',
  passport.authenticate('google', { scope: ['profile'], prompt: 'select_account' })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),

  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
// EOF GOOGLE


// FACEBOOK
router.get('/facebook',
  passport.authenticate('facebook')
);

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),

  (req, res) => {
    // Successful authentication, redirect home.
    console.log('Logged in with facebook');
    res.redirect('/');
  }
);
// EOF FACEBOOK


// LOCAL STRATEGY
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/auth/login' })
);
// EOF LOCAL STRATEGY

// REGISTER
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  
  // register user then redirect
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
          email: req.body.email,
          password: hash
        })
        .then(savedUser => {
          console.log('User saved: ' + savedUser);
          res.redirect('/');
        })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    })

});

// EXPORT

module.exports = router;