import {
    RESTAURANT_ADDED,
    RESTAURANTS_LOADED,
    RESTAURANTS_FAILED,
    RESTAURANT_DELETED,
    RESTAURANT_LOADED,
    RESTAURANT_TABLES_LOADED,
    RESTAURANT_TABLES_FAILED,
    RESTAURANT_TABLES_ADDED,
    RESTAURANT_MENU_LOADED,
    RESTAURANT_MENU_ITEM_ADDED,
    RESTAURANT_MENU_FAILED
} from '../actions/types';

const initialState = {
    restaurants: [],
    selectedRestaurant: null,
    selectedRestaurantTables: null,
    selectedRestaurantMenu: null,
}

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case RESTAURANT_ADDED:
        case RESTAURANT_DELETED:
        case RESTAURANTS_LOADED:
            return {
                ...state,
                restaurants: payload,
            }
        case RESTAURANT_LOADED:
            return {
                ...state,
                selectedRestaurant: payload,
            }
        case RESTAURANT_TABLES_ADDED:
        case RESTAURANT_TABLES_LOADED:
            return {
                ...state,
                selectedRestaurantTables: payload,
            }
        case RESTAURANT_MENU_ITEM_ADDED:
        case RESTAURANT_MENU_LOADED:
            return {
                ...state,
                selectedRestaurantMenu: payload,
            }
        default:
            return state;
    }
}