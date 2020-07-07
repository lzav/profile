const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
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
            ref: 'comment'
        }
    ]
});

const Blog = new mongoose.model('Blog', BlogSchema);

// Blog.deleteMany({})
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

module.exports = Blog; 
