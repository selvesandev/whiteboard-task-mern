import { randomStr } from '../../utils';
import * as ActionTypes from './../ActionTypes';

const INITIAL_STATE = {
    saving: false,
    data: [
        // {name:'category',tasks:[{},{}]},
        // {name:'category',tasks:[{},{}]}
    ],
    fetching: false,
}

const CategoryReducer = (state = INITIAL_STATE, action) => {
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
            let taskSelected = {};
            state.data.map(item => {
                item.tasks = item.tasks.filter(task => {
                    if (task._id === action.payload.id) {
                        taskSelected = task;
                    } else {
                        return task;
                    }
                });
                return item;
            });


            state.data.map(item => {
                if (item._id === action.payload.destination) {
                    item.tasks.push(taskSelected);
                }
                return item;
            });


            return {
                ...state
            };
        case ActionTypes.CATEGORY_TASK_UPDATE_STATIC:
            state.data.map(item => {
                item.tasks = item.tasks.map(task => {
                    if (task._id === action.payload.id) {
                        task.svg_events = action.payload.svg_events;
                    }
                    return task;
                });
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
                    })
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