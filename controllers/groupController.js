const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Schedule = require("../models/scheduleModel")
exports.getGroups = async (req, res) => {
  Group.find()
    .then((groups) => {
      return res.status(200).json({
        groups,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};

exports.addGroup = async (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  let groupExists;
  try {
    groupExists = await Group.findOne({ code });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
  if (groupExists) {
    return res.status(400).json({
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
              // console.log(updatedUser);
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch((err) => {
          // console.log(err);
        });

      return res.status(200).json({
        data: group,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.joinGroup = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  let groupExists;
  try {
    groupExists = await Group.findOne({ code });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
  if (!groupExists) {
    return res.status(400).json({
      message: "Group code does not exists",
    });
  }
  let userfound = groupExists.users.indexOf(req.user._id);
  if (userfound !== -1) {
    return res.status(400).json({
      message: "You are already a part of this group",
    });
  }
  groupExists.users.push(req.user._id);
  Group.findByIdAndUpdate(groupExists._id, groupExists, { new: true })
    .then((group) => {
      User.findById(req.user._id)
        .then((user) => {
          user.groups.push(group._id);
          User.findByIdAndUpdate(req.user._id, user, { new: true })
            .then((updatedUser) => {
              return res.status(200).json({
                message: "Group joined",
              });
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.leaveGroup = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  let groupExists;
  try {
    groupExists = await Group.findOne({ code });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
  if (!groupExists) {
    return res.status(400).json({
      message: "Group code does not exists",
    });
  }
  let userfound = groupExists.users.indexOf(req.user._id);
  if (userfound === -1) {
    return res.status(400).json({
      message: "You are not a part of this group",
    });
  }
  groupExists.users.splice(userfound, 1);
  Group.findByIdAndUpdate(groupExists._id, groupExists, { new: true })
    .then((group) => {
      User.findById(req.user._id)
        .then((user) => {
          user.groups.splice(user.groups.indexOf(group._id), 1);
          User.findByIdAndUpdate(req.user._id, user, { new: true })
            .then((updatedUser) => {
              return res.status(200).json({
                message: "Group left",
              });
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Something went wrong",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(404).json({
      message: "Please fill required field.",
    });
  }
  let foundGroup;
  try {
    foundGroup = await Group.findOne({ _id: id });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
  if (!foundGroup) {
    return res.status(404).json({
      message: "Group not found",
    });
  }
  Schedule.deleteMany({group: id}).then(data=>{
    console.log(data)
  }).catch((err) =>{
    return res.status(500).json({
      message: "Something went wrong while deleting schedules"
    })
  })
  Group.deleteOne({ _id: id })
    .then((data) => {
      return res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};
exports.editGroup = async (req, res) => {
  const {name, code} = req.body
  const id = req.params.id
  
  if (!name || !code) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  let groupExists;
  try {
    groupExists = await Group.findOne({ _id: id }).populate("createdBy");
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
  if (!groupExists) {
    return res.status(404).json({
      message: "Group does not exists",
    });
  }
  Group.findOne({code}).then(group=>{
    if(!group._id.equals(id)){
      return res.status(400).json({
        message: "Group code already in use."
      })
    }
  }).catch(err=>{
    return res.status(500).json({
      message: "Something went wrong.",
    });
  })
  groupExists.name = name;
  groupExists.code = code;
  
  Group.findByIdAndUpdate({_id: id}, {$set: groupExists}, { new: true})
  .then(newGroup=>{
    return res.status(200).json({
      group: newGroup
    })
  }).catch(err=>{
    return res.status(500).json({
      message: "Something went wrong.",
    });
  })


}