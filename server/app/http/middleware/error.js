const { responseError } = require("../../../utils");

/**
 * Prevent Fatal Error and throw response instead
 * @param {*} error 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (error, req, res, next) => {
    res.status(error.status || 500);
    const errorMessage = {
        msg: error.message || 'something failed'
    };

    responseError(res, { msg: errorMessage });
};