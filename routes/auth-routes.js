const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const transporter = require("../config/nodemailer-config");

// AUTH ROUTES

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

// GOOGLE
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true,
    failureFlash: "Oops. Something went wrong. Please try again later.",
  }),

  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
// EOF GOOGLE

// FACEBOOK
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    failureFlash: true,
    failureFlash: "Oops. Something went wrong. Please try again later.",
  }),

  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
// EOF FACEBOOK

// LOCAL STRATEGY
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    failureFlash: "Please check your username or password.",
  })
);

// EOF LOCAL STRATEGY

// REGISTER
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  // check user not already registered
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        console.log("User already exists");
        req.flash("error", "You are already registered. Please log in below.");
        res.redirect("/auth/login");
      } else {
        // register user then redirect
        bcrypt.hash(req.body.password, 10).then((hash) => {
          User.create({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hash,
            // set to false until confirmed reg through email
            confirmed: false,
            rString: randomString.generate(15),
          }).then((savedUser) => {
            console.log("User saved: " + savedUser);

            // Send confirmation email with unique code in
            const mailOptions = {
              from: process.env.MAILOPTIONS_FROM,
              to: savedUser.email,
              subject: "lzDev Confirmation Email",
              text: `Hi ${savedUser.email}
            
            Please click the link below to confirm your registration:

            ${process.env.CONFIRMATION_ROUTE}/${savedUser._id}/${savedUser.rString}

            Kind regards,

            Lorenzo
            `,
            };

            transporter
              .sendMail(mailOptions)
              .then((info) => {
                console.log("Email sent: " + info.response);
              })
              .catch((err) => console.log(err));

            // Redirect to home with flash message
            req.flash(
              "success",
              "Thank you for signing up. Please click the link in the confirmation email to complete your registration."
            );
            res.redirect("/");
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", "Oops. Something went wrong. Please try again later.");
      res.redirect("/auth/login");
    });
});

// Email confirmation route

router.get("/confirm/:user_id/:rString", (req, res) => {
  User.findById(req.params.user_id)
    .then((foundUser) => {
      if (foundUser && foundUser.rString === req.params.rString) {
        // Check user exists and rString match
        // Update confirmed to true and set rString to null
        foundUser
          .updateOne({ $set: { confirmed: true, rString: null } })
          .then((result) => {
            // console.log('Updated user confirmed: ' + result);
            req.flash(
              "success",
              "Thank you for confirming your registration. Please sign in below."
            );
            res.redirect("/auth/login");
          });
      } else {
        // Link is not valid: redirect to reset login page
        console.log("Link is not valid");
        res.redirect("/auth/login");
      }
    })
    .catch((err) => {
      console.log("Something went wrong: " + err);
      res.redirect("/auth/login");
    });
});

// EXPORT

module.exports = router;
