const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        displayName: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

// Comment.deleteMany({})
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

module.exports = Comment;