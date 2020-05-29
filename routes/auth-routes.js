const express = require('express');
const router = express.Router();
const passport = require('passport');

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

  function(req, res) {
    // Successful authentication, redirect home.

    console.log('Logged in with facebook');
    res.redirect('/');
  }
);
// EOF FACEBOOK

module.exports = router;