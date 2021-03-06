import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import uuid from 'uuid';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {

    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //SET ALERT
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, timeout); //There is a payload with an id because we want to which alert to delete.
    }

    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
