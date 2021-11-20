const router = require("express").Router();
const controller = require('../controllers/groupController')
var passport = require('passport');
const checkPermission = require('../utils/checkPermission')

router.get('/', passport.authenticate('jwt',{session: false}), controller.getUserGroups)
router.post('/', passport.authenticate('jwt',{session: false}), checkPermission, controller.addGroup);
router.post('/join', passport.authenticate('jwt',{session: false}), controller.joinGroup);

module.exports = router;
