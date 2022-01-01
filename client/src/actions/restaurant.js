import { 
    RESTAURANTS_LOADED, 
    RESTAURANTS_FAILED, 
    RESTAURANT_ADDED,
    RESTAURANT_LOADED,
    RESTAURANT_TABLES_LOADED,
    RESTAURANT_TABLES_FAILED,
    RESTAURANT_TABLES_ADDED,
} from './types';
import axios from 'axios';
import restaurant from '../reducers/restaurant';

//Load restaurants for a user
export const loadAllRestaurants = () => async dispatch => {
    try {
        const res = await axios.get('/api/restaurants');
        dispatch({
            type: RESTAURANTS_LOADED,
            payload: res.data
        });

    }
    catch(e) {
        dispatch({
            type: RESTAURANTS_FAILED
        })
    }
}

//Add new restaurant for a user
export const addRestaurant = ({name, phone, address}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const body = JSON.stringify({name, phone, address});

        const res = await axios.post('/api/restaurants', body, config);
        dispatch({
            type: RESTAURANT_ADDED,
            payload: res.data
        });

    }
    catch(e) {
        dispatch({
            type: RESTAURANTS_FAILED
        })
    }
}

// Gets a restaurant by id for a user
export const getRestaurant = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/restaurants/${id}`);
        dispatch({
            type: RESTAURANT_LOADED,
            payload: res.data
        });

    }
    catch(e) {
        dispatch({
            type: RESTAURANTS_FAILED
        })
    }
}

// Gets all tables for a restaurant
export const getRestaurantTables = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/restaurants/${id}/tables`);
        dispatch({
            type: RESTAURANT_TABLES_LOADED,
            payload: res.data
        });

    }
    catch(e) {
        dispatch({
            type: RESTAURANT_TABLES_FAILED
        })
    }
}

// Gets all tables for a restaurant
export const addRestaurantTable = (restaurantId, {name, size}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const body = JSON.stringify({name, size});

        const res = await axios.post(`/api/restaurants/${restaurantId}/tables`, body, config);
        dispatch({
            type: RESTAURANT_TABLES_ADDED,
            payload: res.data
        });

    }
    catch(e) {
        dispatch({
            type: RESTAURANT_TABLES_FAILED
        })
    }
}

//Add new restaurant for a user
export const deleteRestaurant = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/restaurants/${id}`);
        dispatch({
            type: RESTAURANT_ADDED,
            payload: res.data
        });

    }
    catch(e) {
        dispatch({
            type: RESTAURANTS_FAILED
        })
    }
}