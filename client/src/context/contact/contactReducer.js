import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload] //We have the original in the state and we add in the payload
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload) //This will return all contacts in the payload that are not the current id. 
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            }
        default:
            return state;
    }
}