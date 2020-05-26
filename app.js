const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => console.log(err));

mongoose.connection
    .once('open', () => console.log('Connected to MongoDB'))
    .on('error', err => console.log(err));


const userSchema = new mongoose.Schema({
    username: String
});

const User = new mongoose.model('user', userSchema);

// User.deleteMany({})
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

// User.create({username: 'Test'})
//     .then(savedUser => console.log(savedUser))
//     .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Home Route');
});


// START SERVER

app.listen(PORT, () => console.log('Listening on port: ' + 3000));