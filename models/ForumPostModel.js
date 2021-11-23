const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("posts", postSchema);
