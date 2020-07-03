const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    googleID: String,
    facebookID: String,
    password: String,
    confirmed: Boolean,
    rString: String
});

const User = new mongoose.model('User', userSchema);

User.deleteMany({})
    .then(result => console.log(result))
    .catch(err => console.log(err));

module.exports = User;