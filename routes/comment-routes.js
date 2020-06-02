const Router = require('express').Router({mergeParams: true});
const Blog = require('../models/blog');
const Comment = require('../models/comment');

Router.get('/new', (req, res) => {
    // res.send('reached comment index route');
    console.log(req.params);

    // Blog.findById(req.params.id)
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err));

    res.render('./comments/new', {blogID: req.params.id});
});

Router.post('/', (req, res) => {
    // res.send('reached post route for comment');
    // console.log(req.params);
    // console.log(req.user);
    // console.log(req.body);

    // save comment, add to comments array in blog, redirect to blog details page
    // check blog exists first, so cannot crash with too many empty comments not related to a blog

    Blog.findById(req.params.id)
        .then(foundBlog => {
            if (foundBlog) {

                const author = {
                    id: req.user._id,
                    displayName: req.user.displayName
                }

                // Save comment
                Comment.create({
                    text: req.body.text,
                    author: author
                })
                    .then(savedComment => {
                        // push to blog array

                        console.log('Comment Saved: ' + savedComment);
                        res.redirect(`/blogs/${req.params.id}`);
                    })
            } else {
                // could not find blog id, so redirect to blogs
                res.redirect('/blogs');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        });
});

module.exports = Router;