const express = require('express');
const router = express();

const taskController = require('../controllers/taskController');

router.get('/', taskController.index)
    .post('/', taskController.store)
    .put('/:id', taskController.update)
    .delete('/:id', taskController.delete).put('/reorder/:id', taskController.reOrder);

module.exports = router;