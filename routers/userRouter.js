const router = require("express").Router();
const controller = require('../controllers/userController')
const checkPermission = require('../utils/checkPermission')
var passport = require('passport');

router.post('/', passport.authenticate('jwt',{session: false}), checkPermission, controller.getUser);
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

module.exports = router;
