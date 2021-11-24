const Category = require("../models/categoryModel");
const Post = require("../models/forumPostModel")

exports.createCategory = async (req, res) => {
  const { name, group } = req.body;
  if (!name) {
    return res.status(422).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }

  let catExists;
  try {
    catExists = await Category.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }

  if (catExists) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const category = new Category({
    name: name,
    categoryType: "root",
    createdBy: req.user._id,
    parentCategory: null,
    group
  });

  category
    .save()
    .then((cat) => {
      return res.status(200).json({
        success: true,
        cat,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    });
};
exports.getAllCategories = async(req, res) => {
  Category.find({categoryType: "root"}).populate("group")    
  .then((categories) => {
    res.status(200).json({
      success: true,
      categories,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  });

}
exports.createTopic = async(req, res) => {
    const {name, parentCategory} = req.body
    if (!name || !parentCategory) {
        return res.status(422).json({
          success: false,
          message: "Please fill all the required fields.",
        });
      }
    
      let catExists;
      try {
        catExists = await Category.findOne({ name });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong.",
        });
      }
    
      if (catExists) {
        return res.status(400).json({
          success: false,
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
            success: true,
            cat,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
        });
}

exports.getAllTopics = async(req, res) => {
  Category.find({categoryType: "topic"})  
  .populate("parentCategory")  
  .then((topics) => {
    res.status(200).json({
      success: true,
      topics,
    });
  })
  .catch((err) => {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  });

}

exports.getCategoriesByGroup = async(req, res) => {
  const groupid = req.params.groupid;
  Category.find({categoryType: "root", group: groupid == "none"? null:groupid}).then((categories) => {
    return res.status(200).json({
      success: true,
      categories,
    })
  }).catch(err=>{
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    })
  })
}

exports.getTopicsByCategory = async(req, res) => {
  const categoryid = req.params.categoryid;
  Category.find({categoryType: "topic", parentCategory: categoryid}).then((topics) => {
    return res.status(200).json({
      success: true,
      topics, 
    })
  }).catch(err=>{
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    })
  })
}

exports.createPost = async(req, res) => {
  const {group, category, topic, title, content} = req.body
  let createdBy = req.user._id

  const post = new Post({ 
    group, category, topic, title, content, createdBy, likes: []
  })

  post
    .save()
    .then(postCreated => {
      return res.status(200).json({
        success: true,
        post: postCreated
      })
    }).catch(err=>{
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      })
    })
}

exports.getPostFilter = async (req, res) => {
  let {group, category, topic} = req.body
  let filterJson = {}
  if(group && group != "") filterJson.group = group
  if(topic && topic != "") filterJson.topic = topic
  if(category && category != "") filterJson.category = category

  Post.find(filterJson)
  .populate('createdBy')
  .populate('group')
  .populate('category')
  .populate('topic')
  .then(posts=>{
    return res.status(200).json({
      success: true,
      posts
    })
  }).catch(err=>{
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    })
  })
}