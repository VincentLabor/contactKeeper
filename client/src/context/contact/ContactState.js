import React, { useReducer } from 'react';
import axios from 'axios';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CONTACTS,
    CONTACT_ERROR
} from '../types';
import contactContext from './contactContext';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null, //This is to store an array of filtered contacts.
        error: null,

    };

    const [state, dispatch] = useReducer(contactReducer, initialState); //State allows us to access anything in state and dispatch allwos us to dispatch things to our reducer. 
    //Below this is the actions 

    //GET contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts') //We're sending in the contact and the config. 
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    //Add contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config) //We're sending in the contact and the config. 
            dispatch({
                type: ADD_CONTACT, payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    }

    //Delete contact
    const deleteContact = async id => {

        try {
            await axios.delete(`/api/contacts/${id}`) //Removed variable because we do not need to store anything here. 

            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }




    }


    //Set Current
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    //Clear Current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    //Update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    //Filter contact
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    //Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <contactContext.Provider value={
            {
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                clearContacts,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts
            }
        }> {/* Value is any state/actions that we wish to access from other components*/}
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;