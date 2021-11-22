const router = require("express").Router();
const controller = require('../controllers/forumController')
var passport = require('passport');
const checkPermission = require('../utils/checkPermission')

router.get('/category', passport.authenticate('jwt',{session: false}), controller.getAllCategories)
router.post('/category', passport.authenticate('jwt',{session: false}), checkPermission, controller.createCategory)
router.get('/topic', passport.authenticate('jwt',{session: false}), controller.getAllTopics)
router.post('/topic', passport.authenticate('jwt',{session: false}), checkPermission, controller.createTopic)


module.exports = router;
