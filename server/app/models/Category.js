const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = mongoose.model('Category', new Schema({
    name: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
}, { timestamps: true }));

module.exports = Category;