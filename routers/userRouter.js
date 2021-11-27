const router = require("express").Router();
const controller = require("../controllers/userController");
const checkPermission = require("../utils/checkPermission");
var passport = require("passport");

router.get("/:id", controller.getUser);
router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.getUsers
);
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deleteUser
);
router.put(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.editUserAdmin
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.editUser
);

router.post(
  "/verify/vaccination",
  passport.authenticate("jwt", { session: false }),
  controller.verifyCertificate
);

module.exports = router;
