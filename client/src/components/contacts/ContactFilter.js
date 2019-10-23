import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const {filterContacts, clearFilter, filtered} = contactContext;

    useEffect(()=>{
        if (filtered === null){
            text.current.value = ''
        }
    })


    const onChange = (e) => {
        if (text.current.value !== ''){ //text.current.value will give us the value of the input
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input type="text" ref={text} onChange={onChange} placeholder="Filter Contacts..." />
        </form>
    )
}

export default ContactFilter
