/**
 * Trims unwanted spaces from front and back in the request body for (POST | PUT | DELETE | PATCH)
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    Object.keys(req.body).map(function (key) {
        if (typeof req.body[key] === 'string')
            req.body[key] = req.body[key].trim();
    });
    next();
};