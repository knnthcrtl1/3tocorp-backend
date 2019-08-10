const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const student_controller = require('../controllers/student.controller');

router.get('/', student_controller.student_get);

router.post('/create', student_controller.student_create);

router.delete('/:id', student_controller.student_delete);

router.put('/:id', student_controller.student_update);

module.exports = router;