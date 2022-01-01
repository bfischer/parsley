import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import restaurant from './restaurant'

export default combineReducers({
    alert,
    auth,
    restaurant,
});