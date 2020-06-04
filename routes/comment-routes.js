const Router = require('express').Router({mergeParams: true});
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const middleware = require('../middleware');

Router.get('/new', middleware.isLoggedIn, (req, res) => {
 
    res.render('./comments/new', {blogID: req.params.id});
});

Router.post('/', middleware.isLoggedIn, (req, res) => {

    // save comment, add to comments array in blog, redirect to blog details page
    // check blog exists first, to ensure comments related to a blog

    Blog.findById(req.params.id)
        .then(foundBlog => {
            if (foundBlog) {

                const author = {
                    id: req.user._id,
                    displayName: req.user.displayName
                }

                // save comment
                Comment.create({
                    text: req.body.text,
                    author: author
                })
                    .then(savedComment => {

                        // push commentID to blog array and save
                        foundBlog.comments.push(savedComment._id);
                        foundBlog.save()
                            .then(updatedBlog => console.log('Blog updated'));

                        // console.log('Comment Saved: ' + savedComment);
                        res.redirect(`/blogs/${req.params.id}`);
                    })
            } else {
                // blog id not found, so redirect to blogs
                res.redirect('/blogs');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        });
});

Router.get('/:comment_id/edit', middleware.isLoggedIn, middleware.isCommentAuthor, (req, res) => {
    // res.send('reached comment edit route for: ' + req.params.comment_id);
    Comment.findById(req.params.comment_id)
        .then(foundComment => res.render('./comments/edit', {blogID: req.params.id, comment: foundComment}))
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        });    
});

Router.patch('/:comment_id', middleware.isLoggedIn, middleware.isCommentAuthor, (req, res) => {
    // res.send('reached patch for comments');

    Comment.findByIdAndUpdate(req.params.comment_id, {$set: {text: req.body.text}})
        .then(updatedComment => {
            console.log(updatedComment);
            res.redirect(`/blogs/${req.params.id}`);
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        });
});

Router.delete('/:comment_id', middleware.isLoggedIn, middleware.isCommentAuthor, (req, res) => {
    // res.send('reached delete for comments');

    Comment.findByIdAndDelete(req.params.comment_id)
        .then(result => {
            // console.log(result);
            res.redirect(`/blogs/${req.params.id}`);
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        });
});

module.exports = Router;