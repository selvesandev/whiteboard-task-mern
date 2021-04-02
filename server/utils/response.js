import * as ResponseTypes from './../config/responses';



const responseError = (res, { msg = 'Something went wrong.', error = {}, statusType = ResponseTypes.HTTP_BAD_REQUEST }) => {
    return res.status(statusType).send({ msg, error, status: false });
};
const responseData = (res, { data = [], statusType = ResponseTypes.HTTP_SUCCESS }) => {
    return res.status(statusType).send({ status: true, data });
};


const responseSuccess = (res, { msg = 'Action was successful.', statusType = ResponseTypes.HTTP_SUCCESS, data = null }) => {
    return res.status(statusType).send({ msg: msg, status: true, data });
};

export { responseError, responseSuccess, responseData };