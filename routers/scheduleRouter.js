const router = require("express").Router();
const controller = require("../controllers/scheduleController");
var passport = require("passport");
const checkPermission = require("../utils/checkPermission");

router.get(
  "/:groupid",
  passport.authenticate("jwt", { session: false }),
  controller.getScheduleByGroup
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.createSchedule
);
router.post(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deleteScheduleAdmin
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteSchedule
);

router.post(
  "/vote",
  passport.authenticate("jwt", { session: false }),
  controller.voteSchedule
);
router.post(
  "/vote/get",
  passport.authenticate("jwt", { session: false }),
  controller.getAllVotes
);

module.exports = router;
