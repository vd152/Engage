const router = require("express").Router();
const controller = require("../controllers/groupController");
var passport = require("passport");
const checkPermission = require("../utils/checkPermission");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getGroups
);
router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  controller.joinGroup
);
router.post(
  "/leave",
  passport.authenticate("jwt", { session: false }),
  controller.leaveGroup
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.addGroup
);
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deleteGroup
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.editGroup
);

module.exports = router;
