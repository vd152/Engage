const router = require("express").Router();
const controller = require('../controllers/groupController')
var passport = require('passport');
const checkPermission = require('../utils/checkPermission')

router.post('/', passport.authenticate('jwt',{session: false}), checkPermission, controller.addGroup);
module.exports = router;
