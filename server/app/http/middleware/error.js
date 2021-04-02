const { responseError } = require("../../../utils");

module.exports = (error, req, res, next) => {
    res.status(error.status || 500);
    const errorMessage = {
        msg: error.message || 'something failed'
    };

    responseError(res, { msg: errorMessage });

    // res.json({
    //     error: errorMessage
    // })
};