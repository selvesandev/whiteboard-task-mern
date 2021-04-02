const { HTTP_NOT_FOUND, HTTP_CREATED } = require('../../../config/responses');
const { responseSuccess, responseError, formatVErrors, responseData, getTimeFormats } = require('../../../utils');
const Category = require('./../../models/Category');
const Joi = require('joi');
const Task = require('../../models/Task');

/**
 * Get all the categories aslong with the related tasks
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.index = async (req, res, next) => {
    try {
        const categories = await Category.find().populate('tasks', 'svg_events').select({ name: 1 });
        return responseData(res, { data: categories });
    } catch (e) {
        next(e);
    }
}


exports.show = (req, res, next) => { }


/**
 * Save the category and joi validation.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.store = async (req, res, next) => {
    try {
        const validateSchema = Joi.object({
            name: Joi.string().min(2).required(),
        });

        const { error } = validateSchema.validate(req.body);
        if (error) return responseError(res, { error: formatVErrors(error) });

        const categoryModel = new Category({ name: req.body.name });
        const category = await categoryModel.save();

        return responseSuccess(res, { data: category, msg: 'Category added successfully', statusType: HTTP_CREATED });
    } catch (e) {
        next(e);
    }
}


/**
 * Update Category Name.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.update = async (req, res, next) => {
    try {
        const validateSchema = Joi.object({
            name: Joi.string().min(3).required(),
        });

        const { error } = validateSchema.validate(req.body);
        if (error) return responseError(res, { error: formatVErrors(error) });

        const id = req.params.id;
        const category = await Category.findById(id);
        if (!category) return responseError(res, { msg: 'Category not found', statusType: HTTP_NOT_FOUND });
        category.name = req.body.name;
        const result = await category.save();

        return responseSuccess(res, { data: result, msg: 'Category was updated successfully' });
    } catch (e) {
        next(e);
    }
}


/**
 * 
 */
exports.delete = () => { }


/**
 * Modify the response header to download the json format of categories withe related task.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.download = async (req, res, next) => {
    const date = getTimeFormats();
    res.writeHead(200, {
        'Content-Type': 'application/json-my-attachment',
        "content-disposition": `attachment; filename="db_backup_${date.year}_${date.month}_${date.date}_${date.hours}_${date.minutes}_${date.seconds}.json"`
    });

    const categories = await Category.find().populate('tasks', 'svg_events').select({ name: 1 });

    return res.end(JSON.stringify(categories));
}

/**
 * Flush all the record categories/task
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.flushRecord = async (req, res, next) => {
    try {
        await Category.remove({});
        await Task.remove({});

        return responseSuccess(res, { msg: 'Removed all record' });
    } catch (e) {
        next(e);
    }
}

