import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';
import contactContext from './contactContext';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState); //State allows us to access anything in state and dispatch allwos us to dispatch things to our reducer. 
    //Below this is the actions 

    //Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    //Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }


    //Set Current

    //Clear Current

    //Update contact

    //Filter contact

    //Clear filter

    return (
        <contactContext.Provider value={
            {
                contacts: state.contacts,
                addContact,
                deleteContact
            }
        }> {/* Value is any state/actions that we wish to access from other components*/}
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;