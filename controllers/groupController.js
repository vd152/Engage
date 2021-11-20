const Group = require("../models/groupModel");
const User = require("../models/userModel");
exports.getUserGroups = async (req, res) => {
    
};

exports.addGroup = async (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) {
    return res.status(422).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }
  let groupExists;
  try {
    groupExists = await Group.findOne({ code });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
  if (groupExists) {
    return res.status(400).json({
      success: false,
      message: "Group code already exists",
    });
  }
  let users = [];
  users.push(req.user._id);
  const group = new Group({ name, code, users, createdBy: req.user._id });
  group
    .save()
    .then((group) => {
      User.findById(req.user._id)
        .then((user) => {
          user.groups.push(group._id);
          User.findByIdAndUpdate(req.user._id, user, { new: true })
            .then((updatedUser) => {
              console.log(updatedUser);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      return res.status(200).json({
        success: true,
        data: group,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    });
};

exports.joinGroup = async (req, res) => {

    const { code } = req.body;
    if ( !code) {
      return res.status(422).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }
    let groupExists;
    try {
      groupExists = await Group.findOne({ code });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
    if (!groupExists) {
      return res.status(400).json({
        success: false,
        message: "Group code does not exists",
      });
    }
    let userfound = groupExists.users.indexOf(req.user._id);
    console.log(userfound);
    if(userfound !== -1) {
        return res.status(400).json({
            success: false,
            message: "You are already a part of this group"
        })
    }
    groupExists.users.push(req.user._id)
    Group.findByIdAndUpdate(groupExists._id, groupExists, {new: true}).then(group=>{
        User.findById(req.user._id)
        .then((user) => {
          user.groups.push(group._id);
          User.findByIdAndUpdate(req.user._id, user, { new: true })
            .then((updatedUser) => {
              console.log(updatedUser);
              return res.status(200).json({
                  success: true,
                  message: "Group joined"
              })
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
              });
        });
    }).catch(err=>{
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    })
};
