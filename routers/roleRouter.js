const router = require("express").Router();
const controller = require('../controllers/roleController')
var passport = require('passport');
const checkPermission = require('../utils/checkPermission')

router.post('/', passport.authenticate('jwt',{session: false}), checkPermission, controller.getRoles);
router.post('/add', controller.addRole);

module.exports = router;
