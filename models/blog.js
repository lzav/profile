const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    text: String,
    author: {
        id: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        displayName: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const Blog = new mongoose.model('Blog', blogSchema);

// Blog.deleteMany({})
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

module.exports = Blog; 
