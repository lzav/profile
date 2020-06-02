const Router = require('express').Router();
const Blog = require('../models/blog');

Router.get('/', (req, res) => {

    Blog.find({})
        .then(foundBlogs => {
            // console.log(foundBlogs);

            res.render('./blogs/index', {blogs: foundBlogs});
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });

    
});


Router.get('/new', isLoggedIn, (req, res) => {
    res.render('./blogs/new');
});


Router.post('/', isLoggedIn, (req, res) => {

    const author = {
        id: req.user._id,
        displayName: req.user.displayName
    }

    // console.log(`Author is ${author}`);
    // console.log(`User is ${req.user}`);
           
    Blog.create({
        title: req.body.title,
        text: req.body.text,
        author: author
    })
        .then(savedBlog => {
            console.log('Blog saved: ' + savedBlog);
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log('Something went wrong saving the blog: '+ err);
            res.redirect('/blogs');
        });
    
})

Router.get('/:id', (req, res) => {
    
    Blog.findById(req.params.id)
        .then(foundBlog => {
            res.render('./blogs/show', {blog: foundBlog});
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        })
});

Router.get('/:id/edit', (req, res) => {

    Blog.findById(req.params.id)
    .then(foundBlog => {
        res.render('./blogs/edit', {blog: foundBlog});
    })
    .catch(err => {
        console.log(err);
        res.redirect('/blogs');
    })

});

Router.patch('/:id', (req, res) => {
        
    Blog.findByIdAndUpdate(req.params.id, {$set: {title: req.body.title, text: req.body.text}})
        .then(updatedBlog => {
            console.log('Blog updated: ' + updatedBlog);
            res.redirect(`/blogs/${req.params.id}`);
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blogs');
        });
});

Router.delete('/:id', (req, res) => {
    
    Blog.findOneAndDelete(req.params.id)
        .then(result => {
            console.log('Blog deleted: ' + result);
            res.redirect('/blogs');
        })
        .catch(err => console.log(err));
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // User logged in
        next();
    } else {
        // User NOT logged in
        res.redirect('/auth/login');
    }
}


module.exports = Router;