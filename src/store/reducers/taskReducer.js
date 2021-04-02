import * as ActionTypes from './../ActionTypes';

const INITIAL_STATE = {
    saving: false,
    data: []
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const TaskReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.TASK_GENERAL_STATE:
            if (!action.payload.deep) {
                state[action.payload.props] = action.payload.value;
            }
            else
                state[action.payload.props][action.payload.deep] = action.payload.value;
            return {
                ...state
            };
        default:
            return { ...state }
    }
}

export default TaskReducer;