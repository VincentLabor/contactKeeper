import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

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
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth/');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }

    }

    //Register User
    const register = async formData => { //formdata is the data used to register the user
        //Since we are making a post request and sending some data, we need the content type header

        const config = { //This is from axios
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config); //We dont have to put http://localhost:5000 because of the proxy value that we made
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data //Will be the token
            });

            loadUser();

        } catch (err) { //In the case of failing registration,
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    //Login User
    const loginUser = () => {

    }

    //Logout
    const logoutUser = () => {

    }

    //Clear Errors 
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider value={
            {
                token: state.token,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                error: state.error,
                user: state.user,
                register,
                loadUser,
                loginUser,
                logoutUser,
                clearErrors
            }
        } >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;