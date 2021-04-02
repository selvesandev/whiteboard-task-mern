import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import taskReducer from './taskReducer';

export default combineReducers({
    category: categoryReducer,
    task: taskReducer
});