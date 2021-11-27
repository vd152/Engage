const Role = require("../models/roleModel");

//finds out the permission value in current role
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

//checks if current user has role with the required permission
const hasPermissions = async (req, res, next) => {
  if (await result(req.user.role, req.body.requiredPermission)) return next();
  else
    return res.status(401).json({
      message: "unauthorised",
    });
};
module.exports = hasPermissions;
