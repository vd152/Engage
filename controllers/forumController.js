const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
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
  Category.find({categoryType: "root"})    
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
