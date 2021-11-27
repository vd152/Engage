const Role = require("../models/roleModel");

exports.getRoles = async (req, res) => {
  Role.find()
    .then((role) => {
      res.status(200).json({
        role,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
exports.addRole = async (req, res) => {
  const { name, permissions } = req.body;

  if (!name) {
    return res.status(422).json({
      message: "Please fill all the required fields.",
    });
  }
  let roleExists;
  try {
    roleExists = await Role.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }

  if (roleExists) {
    return res.status(400).json({
      message: "Role already exists",
    });
  }

  const role = new Role({ name, permissions });
  role
    .save()
    .then((role) => {
      return res.status(200).json({
        role,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.deleteRole = async (req, res) => {
  const id = req.body.id;
  Role.deleteOne({ _id: id })
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

exports.editRole = async (req, res) => {
  const { role } = req.body;
  const id = req.params.id;
  let name = role.name
  let foundRole;
  try {
    foundRole = await Role.findOne({ _id: id });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
  if (!foundRole) {
    return res.status(404).json({
      message: "Role not found.",
    });
  }
  let checkRole;
  try {
    checkRole = await Role.findOne({ name});
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
  if (checkRole && !checkRole._id.equals(foundRole._id)) {
    return res.status(404).json({
      message: "Role name already exists.",
    });
  }
  let newRole = { foundRole, ...role };

  Role.findOneAndUpdate({ _id: id }, { $set: newRole }, { new: true })
    .then((updatedrole) => {
      return res.status(200).json({
        role: updatedrole,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "something went wrong",
      });
    });
};
