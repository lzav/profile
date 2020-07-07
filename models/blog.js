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

<<<<<<< HEAD
// Blog.create({
//     title: "Blog 1 about something junior developery",
//     text: "This is blog text"
// })
//     .then(savedBlog => console.log("Blog saved: " + savedBlog))
//     .catch(err => console.log(err));

=======
>>>>>>> dotenv
module.exports = Blog;
