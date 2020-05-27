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

module.exports = router;