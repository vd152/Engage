const Group = require("../models/groupModel");
const User = require("../models/userModel");
exports.getGroups = async (req, res) => {
    Group.find().then(groups=>{
      return res.status(200).json({
        success: true,
        groups
      })
    }).catch(err=>{
      return res.status(500).json({
        success: false,
        message: "something went wrong"
      })
    })
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

exports.leaveGroup = async (req, res) => {

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
  if(userfound === -1) {
      return res.status(400).json({
          success: false,
          message: "You are not a part of this group"
      })
  }
  groupExists.users.splice(userfound, 1);
  Group.findByIdAndUpdate(groupExists._id, groupExists, {new: true}).then(group=>{
      User.findById(req.user._id)
      .then((user) => {
        user.groups.splice(user.groups.indexOf(group._id),1);
        User.findByIdAndUpdate(req.user._id, user, { new: true })
          .then((updatedUser) => {
            console.log(updatedUser);
            return res.status(200).json({
                success: true,
                message: "Group left"
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

exports.deleteGroup = async(req, res) => {
  const {id} = req.body
  if(!id){
    return res.status(404).json({
      success: false,
      message: "Please fill required field."
    })
  }
  let foundGroup;
  try{
    foundGroup = await Group.findOne({_id: id})
  }catch(err){
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
  if(!foundGroup){
    return res.status(404).json({
      success: false,
      message: "Group not found"
    })
  }

  Group.deleteOne({_id: id}).then(data=>{
    return res.status(200).json({
      success: true,
      data
    })
  }).catch(err=>{
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  })
}
