import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [current, contactContext]); //The bracket of contactContext/current basically says useEffect will be applied if contactContext/current is changed. AKA dependancies

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const onChange = (e) => { setContact({ ...contact, [e.target.name]: e.target.value }) }
    //Based on what the target name is, we are setting it to based on what the corresponding value is. 

    const clearAll = ()=>{
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current === null){
            addContact(contact);
        } else {
            updateContact(contact);
        }
        
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const { name, email, phone, type } = contact;

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current === null ? "Add Contact" : "Update Contact"}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" checked={type === 'personal'} value="personal" onChange={onChange} /> Personal{' '}
            <input type="radio" name="type" checked={type === 'professional'} value="professional" onChange={onChange} /> Professional
            <input type="submit" value={current === null ? "Add Contact" : "Update Contact"} className="btn btn-primary btn-block" />
            {current && <div>
                <button className='btn btn-light btn-block' onClick={clearAll}>
                    Clear
                </button>
                </div>}
        </form>
    )
}

export default ContactForm;