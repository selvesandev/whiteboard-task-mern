import * as ActionTypes from '../ActionTypes';
import { deleteR, post, put } from '../../utils';


/**
 * Use this to update the every task state on the reducer pass deep to update the object state on level down.
 * @param {*} param0 
 * @returns 
 */
export const taskGeneralStateChange = ({ props, value, deep }) => {
    return { type: ActionTypes.TASK_GENERAL_STATE, payload: { props, value, deep } }
}

/**
 * All /task to create task update the loading state
 * @param {*} param0 
 * @returns 
 */
export const createTask = ({ category, svg_events }) => async (dispatch) => {
    try {
        dispatch(taskGeneralStateChange({ props: 'saving', value: true }));

        const response = await post({ url: '/task', data: { category, svg_events } });
        // console.log(response.data.data);
        dispatch({ type: ActionTypes.CATEGORY_TASK_STATIC, payload: { category, svg_events, id: response.data.data._id } });

    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(taskGeneralStateChange({ props: 'saving', value: false }));
    }
}

/**
 * Update the task.
 * @param {*} param0 
 * @returns 
 */
export const updateTask = ({ id, svg_events, mode = 'CREATE', category }) => async (dispatch) => {
    try {
        dispatch(taskGeneralStateChange({ props: 'saving', value: true }));
        const response = await put({ url: `/task/${id}`, data: { svg_events, category: category }, params: { mode } });
        dispatch({ type: ActionTypes.CATEGORY_TASK_UPDATE_STATIC, payload: { id: response.data.data._id, svg_events, mode, category } });
        // dispatch(getCategories());
        return response;
    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(taskGeneralStateChange({ props: 'saving', value: false }));
    }
}


/**
 * Delete task with object id / aslo update the state before the api call for quick response
 * @param {*} param0 
 * @returns 
 */
export const deleteTask = ({ id }) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.CATEGORY_TASK_DELETE_STATIC, payload: { value: id } });
        const response = await deleteR({ url: `/task/${id}` });
        return response;
    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
    }
}

/**
 * Move the task from one component to the other / also update the task/categories update prio api call for quick response 
 * @param {*} param0 
 * @returns 
 */
export const reOrderCategory = ({ destination, id, source, sourceIndex, destinationIndex }) => async (dispatch, getState) => {
    try {
        if (destination === source) return;

        dispatch({ type: ActionTypes.CATEGORY_TASK_REORDER_STATIC, payload: { destination, source, id } });

        const order = getState().category.lastSavedOrder
        dispatch(taskGeneralStateChange({ props: 'ordering', value: true }));
        const response = await put({ url: `/task/reorder/${order.id}`, data: { category: order.destination } }).catch(err => {
            console.log(err);
        });
        return response;
        // }

    } catch (err) {
        //handle error response here..
        console.log(err);
    } finally {
        dispatch(taskGeneralStateChange({ props: 'ordering', value: false }));
    }
}


