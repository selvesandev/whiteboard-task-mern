import { get, post, put, deleteR } from '../../utils';
import * as ActionTypes from '../ActionTypes';

export const categoryGeneralStateChange = ({ props, value, deep }) => {
    return { type: ActionTypes.CATEOGRY_GENERAL_STATE, payload: { props, value, deep } }
}

/**
 * 
 * @param {*} loader 
 * @returns 
 */
export const getCategories = (loader = true) => async (dispatch) => {
    try {
        dispatch(categoryGeneralStateChange({ props: 'fetching', value: true }));
        const categories = await get({ url: '/category' });
        dispatch(categoryGeneralStateChange({ props: 'data', value: categories.data.data }));

    } catch (err) {
        throw Error(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'fetching', value: false }));
    }
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const createCategory = ({ name }) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.CATEGORY_CREATE_STATIC, payload: { name } });
        dispatch(categoryGeneralStateChange({ props: 'saving', value: true }));
        return await post({ url: '/category', data: { name } });
    } catch (err) {
        throw Error(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: false }));
    }
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const updateCategory = ({ id, name }) => async (dispatch) => {
    try {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: true }));
        return await put({ url: `/category/${id}`, data: { name } });
    } catch (err) {
        throw Error(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: false }));
    }
}


/**
 * 
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
        throw Error(err);
    } finally {
        dispatch(categoryGeneralStateChange({ props: 'saving', value: false }));
    }
}



/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const downloadBackup = () => async (dispatch) => {
    try {
        return await get({ url: `/category/download` });
    } catch (err) {
        throw Error(err);
    } finally {
    }
}