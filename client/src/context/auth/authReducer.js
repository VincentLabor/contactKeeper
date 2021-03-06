import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SEARCH_FAIL
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload, //This is the token
                isAuthenticated: true,
                loading: false
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL: 
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }
}