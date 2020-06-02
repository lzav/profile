const Router = require('express').Router();
// const Comment = require('../models/comments');

Router.get('/', (req, res) => {
    // res.send('reached comment index route');

    res.render('./comments/new');
});

module.exports = Router;