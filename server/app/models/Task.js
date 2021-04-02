const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = mongoose.model('Task', new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    svg_events: {
        type: Array,
        required: true
    }
}, { timestamps: true }));

module.exports = Task;