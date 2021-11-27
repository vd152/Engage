const router = require("express").Router();
const controller = require("../controllers/forumController");
var passport = require("passport");
const checkPermission = require("../utils/checkPermission");

//Forum Category routes
router.get(
  "/category",
  passport.authenticate("jwt", { session: false }),
  controller.getAllCategories
);
router.get(
  "/category/:groupid",
  passport.authenticate("jwt", { session: false }),
  controller.getCategoriesByGroup
);
router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.createCategory
);
router.put(
  "/category/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.editCategory
);
router.post(
  "/delete/category",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deleteCategory
);

//Forum Topics routes
router.get(
  "/topic",
  passport.authenticate("jwt", { session: false }),
  controller.getAllTopics
);
router.get(
  "/topic/:categoryid",
  passport.authenticate("jwt", { session: false }),
  controller.getTopicsByCategory
);
router.post(
  "/topic",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.createTopic
);
router.put(
  "/topic/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.editTopic
);

//Forum Post routes
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.createPost
);
router.post(
  "/post/filter",
  passport.authenticate("jwt", { session: false }),
  controller.getPostFilter
);
router.post(
  "/post/admin/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deletePostAdmin
);
router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deletePost
);

//Forum Comment routes
router.post(
  "/post/comment/:postid",
  passport.authenticate("jwt", { session: false }),
  controller.getCommentsByPost
);
router.post(
  "/post/comment",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.createComment
);
router.delete(
  "/post/comment/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteComment
);
router.post(
  "/post/comment/admin/:id",
  passport.authenticate("jwt", { session: false }),
  checkPermission,
  controller.deleteCommentAdmin
);

//Forum Like routes
router.post(
  "/post/like",
  passport.authenticate("jwt", { session: false }),
  controller.likeForumPost
);

module.exports = router;
