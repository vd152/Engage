const User = require("../models/userModel");
const Role = require("../models/roleModel");

const result = async (id, permission) => {
  let output = false;
  await Role.findById(id)
    .then(async (role) => {
      const perm = role.permissions.find((element) => {
        if (element.name === permission) return element; 
      });

      if (perm && perm.value) {
        output = true;
      } 
    })
    .catch(() => {
      output = false;
    });
  return output;
};
const hasPermissions = async (req, res, next) => {
  // console.log(req);
  if (await result(req.user.role, req.body.requiredPermission)) return next();
  else
    return res.status(401).json({
      success: false,
      message: "unauthorised",
    });
};
module.exports = hasPermissions;