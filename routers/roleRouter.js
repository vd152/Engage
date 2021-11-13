const router = require("express").Router();
const controller = require('../controllers/roleController')

router.post('/add', controller.addRole);

module.exports = router;
