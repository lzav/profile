const Blog = require('../models/blog');
const Comment = require('../models/comment');

const middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        // User logged in
        next();
    } else {
        // User NOT logged in
        req.flash("error", "Please log in or register below.");
        res.redirect('/auth/login');
    }
}

middlewareObj.isBlogAuthor = function(req, res, next) {

    Blog.findById(req.params.id)
        .then(foundBlog => {
            if (foundBlog.author.id.equals(req.user.id)) {
                console.log('Is author of blog');
                // Author of blog
                next();
            } else {
                // Not author of blog - redirect back
                console.log('Is NOT author of blog');
                req.flash('error', 'Sorry. You are not the author of this blog.')
                res.redirect('back');
            }
        })
}

middlewareObj.isCommentAuthor = function(req, res, next) {
    
    Comment.findById(req.params.comment_id)
        .then(foundComment => {
            if (foundComment && foundComment.author.id.equals(req.user._id)) {
                console.log('Comment found and user is author');
                next();
            } else {
                // not author of comment
                req.flash('error', 'Sorry. You are not the author of this comment.');
                console.log('User is NOT the author of the comment');
                res.redirect('back');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        })    
}


module.exports = middlewareObj;