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

  const {name, contactEmail, message } = req.body;

  // Server validation for contact
  if (!name || !message || !validateEmail(contactEmail)) {
    req.flash('error', 'Oops. Something went wrong sending you message. Please try again later.');
    return res.redirect('/');
  }

  const mailOptions = {
    from: "lzdev20@***REMOVED***.com",
    to: "lzdev20@***REMOVED***.com",
    subject: "Message from Website",
    text: `Message from ${name}, ${contactEmail}:
    
    ${message}`
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

function validateEmail(email) {
  const patt = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const result = patt.test(email);
  return result;
}


module.exports = router;
