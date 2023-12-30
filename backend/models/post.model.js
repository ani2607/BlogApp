
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title : String,
    description : String,
    coverImage : String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModel",
    },

},{timestamps : true});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
