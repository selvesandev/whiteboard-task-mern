/**
 * Handle Cors
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports = function (req, res, next) {
    //give access to all
    res.header('Access-Control-Allow-Origin', '*');
    //what type of header do we accept
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
    // res.header('*');

    if (req.method === 'OPTIONS') {
        //telling the browser what request it might send
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    //if we are not having a OPTIONS request we should forward the request to next.
    next();
};