import { get, post, put, deleteR } from '../../utils';
import * as ActionTypes from '../ActionTypes';

/**
 * Use this to update the every category state on the reducer pass deep to update the object state on level down.
 * @param {*} param0 
 * @returns 
 */
export const categoryGeneralStateChange = ({ props, value, deep }) => {
    return { type: ActionTypes.CATEOGRY_GENERAL_STATE, payload: { props, value, deep } }
}

/**
 * Fetch categories from the api
 * @param {*} loader 
 * @returns 
 */
export const getCategories = (loader = true) => async (dispatch) => {
    try {
        dispatch(categoryGeneralStateChange({ props: 'fetching', value: true }));
        const categories = await get({ url: '/category' });
        dispatch(categoryGeneralStateChange({ props: 'data', value: categories.data.data }));

    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'fetching', value: false }));
    }
}

/**
 * Create new category
 * @param {*} param0 
 * @returns 
 */
export const createCategory = ({ name }) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.CATEGORY_CREATE_STATIC, payload: { name } });
        dispatch(categoryGeneralStateChange({ props: 'saving', value: true }));
        return await post({ url: '/category', data: { name } });
    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: false }));
    }
}

/**
 * Update Category
 * @param {*} param0 
 * @returns 
 */
export const updateCategory = ({ id, name }) => async (dispatch) => {
    try {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: true }));
        return await put({ url: `/category/${id}`, data: { name } });
    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: false }));
    }
}


/**
 * Delete all task/categories
 * @param {*} param0 
 * @returns 
 */
export const flushRecord = () => async (dispatch) => {
    try {
        dispatch(categoryGeneralStateChange({ props: 'data', value: [] }));
        const response = await deleteR({ url: `/category/flush-record` });
        dispatch(getCategories());
        return response;
    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: false }));
    }
}



/**
 * Download the json verson of mongo db.
 * @param {*} param0 
 * @returns 
 */
export const downloadBackup = () => async () => {
    try {
        return await get({ url: `/category/download` });
    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
    }
}