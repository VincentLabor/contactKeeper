import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), //Access local browser for 'token'
        loading: true,
        isAuthenticated: null, //Tells us if we are logged in or not.
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User: This will check which user will be logged in

    //Register User

    //Login User

    //Logout

    //Clear Errors 

    return (
        <AuthContext.Provider value={
            {
                token: state.token,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                error: state.error,
                user: state.user
            }
        } >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;