const router = require("express").Router();
const controller = require('../controllers/scheduleController')
var passport = require('passport');
const checkPermission = require('../utils/checkPermission')

// router.get('/', passport.authenticate('jwt',{session: false}), controller.getUserGroups)
router.post('/', passport.authenticate('jwt',{session: false}), checkPermission, controller.createSchedule);
router.get('/:groupid', passport.authenticate('jwt',{session: false}), controller.getScheduleByGroup)
router.post('/vote', passport.authenticate('jwt',{session: false}), controller.voteSchedule)
router.post('/vote/get', passport.authenticate('jwt',{session: false}), controller.getAllVotes)

router.delete('/:id', passport.authenticate('jwt',{session: false}), controller.deleteSchedule)
router.post('/admin/:id', passport.authenticate('jwt',{session: false}),checkPermission, controller.deleteScheduleAdmin)

module.exports = router;
