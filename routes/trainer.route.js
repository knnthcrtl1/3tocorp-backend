const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const trainer_controller = require('../controllers/trainer.controller');

router.get('/', trainer_controller.trainer_get);

router.post('/create', trainer_controller.trainer_create);

router.delete('/:id', trainer_controller.trainer_delete);

router.put('/:id', trainer_controller.trainer_update);

module.exports = router;