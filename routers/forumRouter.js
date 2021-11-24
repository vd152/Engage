const router = require("express").Router();
const controller = require('../controllers/forumController')
var passport = require('passport');
const checkPermission = require('../utils/checkPermission')

router.get('/category', passport.authenticate('jwt',{session: false}), controller.getAllCategories)
router.post('/category', passport.authenticate('jwt',{session: false}), checkPermission, controller.createCategory)
router.get('/topic', passport.authenticate('jwt',{session: false}), controller.getAllTopics)
router.post('/topic', passport.authenticate('jwt',{session: false}), checkPermission, controller.createTopic)

router.get('/category/:groupid', passport.authenticate('jwt',{session: false}), controller.getCategoriesByGroup)
router.get('/topic/:categoryid', passport.authenticate('jwt',{session: false}), controller.getTopicsByCategory)

router.post('/post', passport.authenticate('jwt',{session: false}), checkPermission, controller.createPost)
router.post('/post/filter', passport.authenticate('jwt',{session: false}), controller.getPostFilter)


module.exports = router;
