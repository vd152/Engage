const Category = require("../models/categoryModel");
const Post = require("../models/forumPostModel");
const Comment = require("../models/commentModel");
exports.createCategory = async (req, res) => {
  const { name, group } = req.body;
  if (!name) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }

  let catExists;
  try {
    catExists = await Category.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }

  if (catExists) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }

  const category = new Category({
    name: name,
    categoryType: "root",
    createdBy: req.user._id,
    parentCategory: null,
    group,
  });

  category
    .save()
    .then((cat) => {
      return res.status(200).json({
        cat,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};
exports.getAllCategories = async (req, res) => {
  Category.find({ categoryType: "root" })
    .populate("group")
    .then((categories) => {
      res.status(200).json({
        categories,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
exports.createTopic = async (req, res) => {
  const { name, parentCategory } = req.body;
  if (!name || !parentCategory) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }

  let catExists;
  try {
    catExists = await Category.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }

  if (catExists) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }

  const category = new Category({
    name: name,
    categoryType: "topic",
    createdBy: req.user._id,
    parentCategory: parentCategory,
  });

  category
    .save()
    .then((cat) => {
      return res.status(200).json({
        cat,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.getAllTopics = async (req, res) => {
  Category.find({ categoryType: "topic" })
    .populate("parentCategory")
    .then((topics) => {
      res.status(200).json({
        topics,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.getCategoriesByGroup = async (req, res) => {
  const groupid = req.params.groupid;
  Category.find({
    categoryType: "root",
    group: groupid == "none" ? null : groupid,
  })
    .then((categories) => {
      return res.status(200).json({
        categories,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.getTopicsByCategory = async (req, res) => {
  const categoryid = req.params.categoryid;
  Category.find({ categoryType: "topic", parentCategory: categoryid })
    .then((topics) => {
      return res.status(200).json({
        topics,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.createPost = async (req, res) => {
  const { group, category, topic, title, content } = req.body;
  let createdBy = req.user._id;
  if (!category || !topic || !title || !content) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  console.log(group)
  const post = new Post({
    group: group=="none"?null:group,
    category,
    topic,
    title,
    content,
    createdBy,
    likes: [],
  });

  post
    .save()
    .then((postCreated) => {
      return res.status(200).json({
        post: postCreated,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.getPostFilter = async (req, res) => {
  let { group, category, topic } = req.body;
  let filterJson = {};
  if (group && group != "") filterJson.group = group;
  if (topic && topic != "") filterJson.topic = topic;
  if (category && category != "") filterJson.category = category;

  Post.find(filterJson)
    .populate("createdBy")
    .populate("group")
    .populate("category")
    .populate("topic")
    .then((posts) => {
      return res.status(200).json({
        posts,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(422).json({
      message: "Invalid request",
    });
  }
  Category.deleteMany({parentCategory: id}).then(data=>{
    console.log(data)
  }).catch(err=>{
    return res.status(500).json({
      message: "Something went wrong.",
    })
  })
  Category.deleteOne({ _id: id })
    .then((data) => {
      return res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
exports.editCategory = async (req, res) => {
  const { name, group } = req.body;
  const id = req.params.id;

  if (!name) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }

  let catExists;
  try {
    catExists = await Category.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }

  if (catExists && !catExists._id.equals(id)) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }

  Category.findOneAndUpdate(
    { _id: id },
    { $set: { name: name, group: group } },
    { new: true }
  )
    .then((updatedcat) => {
      return res.status(200).json({
        category: updatedcat,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
exports.editTopic = async (req, res) => {
  const { name, parentCategory } = req.body;
  const id = req.params.id;

  if (!name || !parentCategory) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }

  let catExists;
  try {
    catExists = await Category.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }

  if (catExists && !catExists._id.equals(id)) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }

  Category.findOneAndUpdate(
    { _id: id },
    { $set: { name: name, parentCategory: parentCategory } },
    { new: true }
  )
    .then((updatedtopic) => {
      return res.status(200).json({
        category: updatedtopic,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
exports.likeForumPost = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(422).json({
      message: "Invalid request.",
    });
  }
  Post.findOne({ _id: id })
    .then((post) => {
      if (post.likes.includes(req.user._id)) {
        post.likes.splice(post.likes.indexOf(req.user._id), 1);
      } else {
        post.likes.push(req.user._id);
      }
      Post.findOneAndUpdate(
        { _id: id },
        { $set: { likes: post.likes } },
        { new: true }
      )
        .then((updated) => {
          return res.status(200).json({
            post: updated,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "something went wrong",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.createComment = async (req, res) => {
  const { id, content } = req.body;
  if (!id || !content)
    return res.status(422).json({
      message: "Invalid or incomplete data.",
    });

  const comment = new Comment({
    user: req.user._id,
    content: content,
    post: id,
  });

  comment
    .save()
    .then((newcomment) => {
      return res.status(200).json({
        comment: newcomment,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.getCommentsByPost = async (req, res) => {
  const { postid } = req.params;

  Comment.find({ post: postid })
    .populate({
      path: "user",
      select: ["firstName", "lastName", "email", "enrollmentNumber"],
    })
    .then((comments) => {
      return res.status(200).json({
        sucsess: true,
        comments,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};
exports.deleteComment = async(req, res) => {
  const id = req.params.id
  let foundComment;
  try{
    foundComment = await Comment.findOne({_id: id})
  }catch(err){
    return res.status(500).json({
      message: "Something went wrong",
    })
  }
  if(!foundComment){
    return res.status(404).json({
      message: "Comment not found",
    })
  }
  if(!foundComment.user.equals(req.user._id)){
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  Comment.deleteOne({_id: id}).then((data)=>{
    return res.status(200).json({
      data
    })
  }).catch((err)=>{
    return res.status(500).json({
      message: "Something went wrong"
    })
  })
}
exports.deleteCommentAdmin = async(req, res) => {
  const id = req.params.id
  let foundComment;
  try{
    foundComment = await Comment.findOne({_id: id})
  }catch(err){
    return res.status(500).json({
      message: "Something went wrong",
    })
  }
  if(!foundComment){
    return res.status(404).json({
      message: "Comment not found",
    })
  }

  Comment.deleteOne({_id: id}).then((data)=>{
    return res.status(200).json({
      data
    })
  }).catch((err)=>{
    return res.status(500).json({
      message: "Something went wrong"
    })
  })
}
exports.deletePost = async(req, res) => {
  const id = req.params.id
  let foundPost;
  try{
    foundPost = await Post.findOne({_id: id})
  }catch(err){
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
  if(!foundPost){
    return res.status(404).json({
      message: "Post not found."
    })
  }
  if(!foundPost.createdBy._id.equals(req.user._id)){
    return res.status(401).json({
      message: "Unauthorized"
    })
  }
  Comment.deleteMany({post: id}).then(data=>{
    console.log(data)
  }).catch(err => {
    return res.status(500).json({
      message: "Something went wrong.",
    })
  })
  Post.deleteOne({_id: id}).then((data)=>{
    return res.status(200).json({
      data
    })
  }).catch((err)=>{
    return res.status(500).json({
      message: "Something went wrong"
    })
  })
}
exports.deletePostAdmin = async(req, res) => {
  const id = req.params.id
  let foundPost;
  try{
    foundPost = await Post.findOne({_id: id})
  }catch(err){
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
  if(!foundPost){
    return res.status(404).json({
      message: "Post not found."
    })
  }
  Comment.deleteMany({post: id}).then(data=>{
    console.log(data)
  }).catch(err => {
    return res.status(500).json({
      message: "Something went wrong.",
    })
  })
  Post.deleteOne({_id: id}).then((data)=>{
    return res.status(200).json({
      data
    })
  }).catch((err)=>{
    return res.status(500).json({
      message: "Something went wrong"
    })
  })
}