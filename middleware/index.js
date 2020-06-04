const Blog = require('../models/blog');
const Comment = require('../models/comment');

const middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        // User logged in
        next();
    } else {
        // User NOT logged in
        res.redirect('/auth/login');
    }
}

middlewareObj.isBlogAuthor = function(req, res, next) {
    // console.log(req.params);
    // console.log(req.user);

    Blog.findById(req.params.id)
        .then(foundBlog => {
            if (foundBlog.author.id.equals(req.user.id)) {
                console.log('Is author of blog');
                // Author of blog
                next();
            } else {
                // Not author of blog - redirect back
                console.log('Is NOT author of blog');
                res.redirect('back');
            }
        })
}


module.exports = middlewareObj;