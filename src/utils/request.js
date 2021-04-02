import axios from "axios";
const apiURL = process.env.REACT_APP_API_PATH;
axios.defaults.baseURL = apiURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.data) {
        switch (error.response.status) {
            case 400:
                //open notification
                break;
            case 401:
                //logout
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
});


/**
 * Send Get Request to the server uses axios
 * @param {*} param0 
 * @returns 
 */
export const get = ({ url, params }) => {
    let token = null;
    return new Promise((resolve, reject) => {
        let requestObject = {
            method: "GET",
            url,
            params,
        };
        if (token) {
            requestObject.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return resolve(axios(requestObject));
    });
};


/**
 * Send Post Request to the server uses axios
 * @param {*} param0
 * @returns
 */

export const post = ({ url, data, params }) => {
    let token = null;
    return new Promise((resolve, reject) => {

        let requestObject = {
            method: 'POST',
            url,
            data,
            params,
            headers: {}
        };

        if (token) {
            requestObject.headers = {
                Authorization: `Bearer ${token}`
            };
        }

        return resolve(axios(requestObject));
    });
};

/**
 * Send Put Request to the server uses axios
 * @param {*} param0
 * @returns
 */

export const put = ({ url, data, params }) => {
    let token = null;
    return new Promise((resolve, reject) => {
        let requestObject = {
            method: 'PUT',
            url,
            data,
            params,
            headers: {}
        };

        if (token) {
            requestObject.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return resolve(axios(requestObject));
    });
};


/**
 * Send Delete Request to the server uses axios
 * @param {*} param0
 * @returns
 */

export const deleteR = ({ url, data, params = {} }) => {
    let token = null;

    return new Promise((resolve, reject) => {
        let requestObject = {
            method: "DELETE",
            url,
            data,
            params,
            headers: {}
        };
        if (token) {
            requestObject.headers = {
                Authorization: `${token}`
            };
        }
        return resolve(axios(requestObject));
    });
};




// export const sendPut = (url, data, params = {}, tokenCheck = false, ctx = {}, fileUpload = false) => {
//     let token = '';
//     if (tokenCheck === true) {
//         token = getCookie('et_au', ctx.req);
//     }
//     return new Promise((resolve, reject) => {
//         if (tokenCheck && !token) return reject({ internal_error: 'Access Token is missing!' });

//         let requestObject = {
//             method: 'PUT',
//             url,
//             data,
//             params,
//             httpsAgent: new https.Agent({ rejectUnauthorized: false })
//         };

//         if (token) {
//             requestObject.headers = {
//                 Authorization: `${token}`
//             };
//         }


//         if (fileUpload) {
//             requestObject.headers['Content-Type'] = 'multipart/form-data';
//         }
//         return resolve(axios(requestObject));
//     });
// };



