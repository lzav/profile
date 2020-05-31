const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleID: String,
    facebookID: String,
    password: String,
    confirmed: Boolean,
    rString: String
});

const User = new mongoose.model('user', userSchema);

// User.deleteMany({})
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

module.exports = User;