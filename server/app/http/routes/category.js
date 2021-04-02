const express = require('express');
const router = express();

const categoryController = require('./../controllers/categoryController');

router.get('/', categoryController.index)
    .post('/', categoryController.store)
    .put('/:id', categoryController.update).get('/download', categoryController.download)
    .delete('/flush-record', categoryController.flushRecord);

module.exports = router;