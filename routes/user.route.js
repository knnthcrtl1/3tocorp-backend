const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

// router.get('/', trainer_controller.trainer_get);

router.post('/signin', user_controller.user_signin);


module.exports = router;