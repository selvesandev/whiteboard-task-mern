const { HTTP_CREATED } = require('../../../config/responses');
const { responseSuccess, responseError, formatVErrors, responseData } = require('../../../utils');
const Category = require('../../models/Category');
const Joi = require('joi');
const Task = require('../../models/Task');

/**
 * Select all categories on (name)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.index = async (req, res, next) => {
    try {
        const categories = await Category.find().select({ name: 1 });
        return responseData(res, { data: categories });
    } catch (e) {
        next(e);
    }
}


exports.show = (req, res, next) => { }


/**
 * Store a new card and svg data also add reference
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.store = async (req, res, next) => {
    try {
        //validate
        const validateSchema = Joi.object({
            category: Joi.string().required(),
            svg_events: Joi.array().required()
        });
        const { error } = validateSchema.validate(req.body);
        if (error) return responseError(res, { error: formatVErrors(error) });

        const { category, svg_events } = req.body;

        //check if the category exists before saving the task
        const categoryObj = await Category.findById(category);
        if (!categoryObj) return responseError(res, { msg: 'Cound not find category' });


        const taskModel = new Task({ svg_events, category });
        const task = await taskModel.save();

        //updating the category's task for one to many.
        await Category.findByIdAndUpdate(category, {
            $push: { tasks: task._id },
        }, { new: true, useFindAndModify: false });

        return responseSuccess(res, { data: task, msg: 'Task was saved successfully' });
    } catch (e) {
        next(e);
    }
}


/**
 * Handle task update and duplicate with [mode=DUPLICATE/CREATE] request param
 * 
 * Handling both on the same function because it will be easy to add feature id the card shuould be updated before the duplication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.update = async (req, res, next) => {
    try {
        const validateSchema = Joi.object({
            svg_events: Joi.array().required(),
            category: Joi.string()
        });
        const { error } = validateSchema.validate(req.body);
        if (error) return responseError(res, { error: formatVErrors(error) });

        const { svg_events } = req.body;

        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) return responseError(res, { msg: 'Task not found', statusType: HTTP_NOT_FOUND });

        if (req.query.mode && req.query.mode === 'DUPLICATE') {
            //if duplicate save a new task on the searched task's category aslo attach the new reference 
            //to category
            const taskModel = new Task({ svg_events, category: req.body.category });
            const newTask = await taskModel.save();
            await Category.findByIdAndUpdate(newTask.category, {
                $push: { tasks: newTask._id },
            }, { new: true, useFindAndModify: false });
            return responseSuccess(res, { data: newTask, msg: 'Task copied successfully' });
        }

        //else just update
        task.svg_events = svg_events;
        await task.save();
        return responseSuccess(res, { data: task, msg: 'Task was updated successfully' });

    } catch (e) {
        next(e);
    }
}

/**
 * Delete the task also remove the reference from the category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        // const task = await Task.findById(id).select('_id category');
        const task = await Task.findByIdAndRemove(id);
        if (!task) return responseError(res, { msg: 'Task not found' });

        await Category.updateOne({ _id: task.category }, { $pull: { tasks: task._id } });

        return responseSuccess(res, { msg: 'Task was removed' });
    } catch (e) {
        next(e);
    }
}

/**
 * Update the task's category 
 * 1) Remove task object id from the old category tasks relation and push to the new category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.reOrder = async (req, res, next) => {
    try {
        const id = req.params.id;

        //put the task in this category
        const { category } = req.body;
        // const task = await Task.findById(id).select('_id category');
        const task = await Task.findById(id);
        if (!task) return responseError(res, { msg: 'Task not found' });

        //remove from the current
        await Category.updateOne({ _id: task.category }, { $pull: { tasks: task._id } });
        await Category.updateOne({ _id: category }, { $push: { tasks: task._id } });
        task.category = category;
        await task.save();
        return responseSuccess(res, { msg: 'Moved Successfully' });
    } catch (e) {
        next(e);
    }
}