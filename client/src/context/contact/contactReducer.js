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
    SET_ALERT,
    REMOVE_ALERT,
    CONTACT_ERROR
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [ action.payload,...state.contacts], //If we move action.payload to the front, the contacts will be sorted by added date
                loading: false //We have the original in the state and we add in the payload
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload), //This will return all contacts in the payload that are not the current id. 
                loading: false
            };
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts: null,
                current: null,
                filtered: null,
                error: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, 'gi') //gi for global insensitive. Will match regardless of capitalization. 
                    return contact.name.match(regex) || contact.email.match(regex);
                }),
                loading: false
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                loading: false
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}