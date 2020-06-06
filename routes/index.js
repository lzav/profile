const router = require("express").Router();
const transporter = require("../config/nodemailer-config");


router.get("/", (req, res) => {
  // console.log('Is the user authenticated? ' + req.isAuthenticated());
  res.render("index");
});

router.get("/contact", (req, res) => {
  // res.send('Contact route');
  res.render("contact");
});

router.post("/contact", (req, res) => {
  const mailOptions = {
    from: "lzdev20@***REMOVED***.com",
    to: "lzdev20@***REMOVED***.com",
    subject: "Message from Website",
    text: req.body.message,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
      // Redirect to home with flash message
      req.flash("success", "Your message has been sent.");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", "Oops. Something went wrong. Please try again later.");
      res.redirect("/");
    });
});


module.exports = router;
