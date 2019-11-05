import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => { //Basically this will check the browser for the token and will then load the user associated.  
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home
