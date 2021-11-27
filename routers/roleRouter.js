const router = require("express").Router();
const controller = require("../controllers/roleController");
var passport = require("passport");
const checkPermission = require("../utils/checkPermission");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.getRoles
);
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.addRole
);
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deleteRole
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.editRole
);

module.exports = router;
