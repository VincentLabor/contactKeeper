import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => { //This is pulled from Contacts.js
    const contactContext = useContext(ContactContext);
    const {deleteContact, clearCurrent, setCurrent} = contactContext;
    const { _id, name, email, phone, type } = contact;

    const onDelete= () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left">
                {name} {' '} <span className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} {/* Remember that slice is used to continue at the number in the array */}
                </span>
            </h3>
            <ul>
                {email && (<li>
                    <i className='fas fa-envelope-open'></i> {email}
                </li>)}
                {phone && (<li>
                    <i className='fas fa-phone'></i> {phone}
                </li>)}
            </ul>
            <p>
                <button onClick={()=>setCurrent(contact)} className="btn btn-dark btn-sm">Edit</button> {/*When wanting to pass in information, use a function that */}
                <button onClick={onDelete} className="btn btn-danger btn-sm">Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
