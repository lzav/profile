const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const passportConfig = require('./config/passport-config');
const keys = require('./config/keys');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth-routes');
const blogRoutes = require('./routes/blog-routes');
const commentRoutes = require('./routes/comment-routes');


mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
})
    .catch(err => console.log(err));

mongoose.connection
    .once('open', () => console.log('Connected to MongoDB'))
    .on('error', err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));

// Cookies
app.use(expressSession({
    secret: keys.expressSession.secret,
    saveUninitialized: true,
    resave: false,
    maxAge: 24*60*60*1000
}));

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
    extended: true
}));

// Initialize PassportJS and call session strategy
app.use(passport.initialize());
app.use(passport.session());


// ROUTES

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/blogs/:id/comments', commentRoutes);


app.get('/', (req, res) => {
    console.log('Is the user authenticated? ' + req.isAuthenticated());
    res.render('index');
});


// START SERVER

app.listen(PORT, () => console.log('Listening on port: ' + 3000));