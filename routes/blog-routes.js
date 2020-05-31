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


Router.get('/new', (req, res) => {
    res.render('./blogs/new');
});


Router.post('/', (req, res) => {
           
    Blog.create({
        title: req.body.title,
        text: req.body.text
    })
        .then(savedBlog => {
            console.log('Blog saved: ' + savedBlog);
        })
        .catch(err => console.log('Something went wrong saving the blog: '+ err));


    res.redirect('/blogs');
})

Router.get('/:id', (req, res) => {
    console.log(req.params.id);

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



module.exports = Router;