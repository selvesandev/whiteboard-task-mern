import * as ActionTypes from '../ActionTypes';
import { deleteR, post, put } from '../../utils';
import { getCategories } from './categoryAction';


export const taskGeneralStateChange = ({ props, value, deep }) => {
    return { type: ActionTypes.TASK_GENERAL_STATE, payload: { props, value, deep } }
}

export const createTask = ({ category, svg_events }) => async (dispatch) => {
    try {
        dispatch(taskGeneralStateChange({ props: 'saving', value: true }));
        return await post({ url: '/task', data: { category, svg_events } });
    } catch (err) {
        throw Error(err);
    } finally {
        dispatch(taskGeneralStateChange({ props: 'saving', value: false }));
    }
}

export const updateTask = ({ id, svg_events, mode = 'CREATE' }) => async (dispatch) => {
    try {
        dispatch(taskGeneralStateChange({ props: 'saving', value: true }));
        dispatch({ type: ActionTypes.CATEGORY_TASK_UPDATE_STATIC, payload: { id, svg_events } });
        const response = await put({ url: `/task/${id}`, data: { svg_events }, params: { mode } });
        return response;
    } catch (err) {
        throw Error(err);
    } finally {
        dispatch(taskGeneralStateChange({ props: 'saving', value: false }));
    }
}


export const deleteTask = ({ id }) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.CATEGORY_TASK_DELETE_STATIC, payload: { value: id } });

        const response = await deleteR({ url: `/task/${id}` });
        // dispatch(getCategories(false));
        return response;
    } catch (err) {
        throw Error(err);
    } finally {
    }
}

export const reOrderCategory = ({ destination, id, source }) => async (dispatch) => {
    try {
        if (destination === source) return;
        if (!destination) {
            return;
        }
        dispatch({ type: ActionTypes.CATEGORY_TASK_REORDER_STATIC, payload: { destination, source, id } });
        const response = await put({ url: `/task/reorder/${id}`, data: { category: destination } }).catch(err => {
            console.log(err);
        });
        dispatch(getCategories(false));
        return response;
    } catch (err) {
        throw Error(err);
    } finally {
    }
}


