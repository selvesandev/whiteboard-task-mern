import { randomStr } from '../../utils';
import * as ActionTypes from './../ActionTypes';

const INITIAL_STATE = {
    saving: false,
    data: [],
    fetching: false,
    lastSavedOrder: {
        destination: '',
        id: '',
        source: ''
    }
}


/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const CategoryReducer = (state = INITIAL_STATE, action) => {

    /**
     * Filter the task with the given id from the state
     * @param {*} taskId 
     * @returns 
     */
    function filterFromTask(taskId) {
        let tsk = null;
        try {
            state.data.map(item => {
                item.tasks.map(task => {
                    if (task._id === taskId) {
                        tsk = task;
                        throw Error("");
                    }
                    return task;
                });
                return item;
            });
        } catch (err) {
        }
        return tsk;
    }


    /**
     * Reducer Begins here
     */
    switch (action.type) {
        case ActionTypes.CATEOGRY_GENERAL_STATE:
            if (!action.payload.deep) {
                state[action.payload.props] = action.payload.value;
            }
            else
                state[action.payload.props][action.payload.deep] = action.payload.value;
            return {
                ...state
            };
        case ActionTypes.CATEGORY_CREATE_STATIC:
            state.data.push({ name: action.payload.name, tasks: [], _id: randomStr(10), static: true });
            return {
                ...state
            };
        case ActionTypes.CATEGORY_TASK_REORDER_STATIC:
            const taskSelected = filterFromTask(action.payload.id);
            state.data.map(item => {
                item.tasks = item.tasks.filter(task => {
                    return (task._id !== action.payload.id);
                });
                return item;
            });


            state.data = state.data.map(item => {
                if (item._id === action.payload.destination) {
                    if (taskSelected) {
                        taskSelected.category = action.payload.destination;
                    }
                    item.tasks.push(taskSelected);
                }
                return item;
            });
            state.lastSavedOrder = action.payload;
            return {
                ...state
            };
        case ActionTypes.CATEGORY_TASK_UPDATE_STATIC:
            if (action.payload.mode === 'DUPLICATE') {
                state.data.map(item => {
                    item.tasks = item.tasks.map(task => {
                        if (task._id === action.payload.id) {
                            task.svg_events = action.payload.svg_events;
                            // task.static = true;
                        }
                        return task;
                    });
                    return item;
                });
            }
            return {
                ...state
            };

        case ActionTypes.CATEGORY_TASK_STATIC:
            state.data.map(item => {
                if (item._id === action.payload.category) {
                    let isStatic = false;
                    let id = randomStr(10);
                    if (action.payload.id) {
                        id = action.payload.id;
                        isStatic = false;
                    }

                    item.tasks.push({ _id: id, svg_events: action.payload.svg_events, category: action.payload.category, static: isStatic });
                }
                return item;
            });
            return {
                ...state
            };

        case ActionTypes.CATEGORY_TASK_DELETE_STATIC:
            let categoryIndex = null;
            let taskIndex = null;
            try {
                state.data.map((item, c) => {
                    categoryIndex = c;
                    item.tasks.map((task, t) => {
                        if (task._id === action.payload.value) {
                            taskIndex = t;
                            throw Error("stop");
                        }
                        return task;
                    })
                    return item;
                })
            } catch (e) {
            }
            if (categoryIndex !== null && taskIndex !== null && state.data[categoryIndex]) {
                state.data[categoryIndex].tasks.splice(taskIndex, 1);
            }
            return {
                ...state
            }
        default:
            return { ...state }
    }
}

export default CategoryReducer;