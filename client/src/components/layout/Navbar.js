import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);

    const {clearContacts} = contactContext;
    const { isAuthenticated, logoutUser, user } = authContext;

    const onLogout = ()=>{
        logoutUser();
        clearContacts();
    }

    const authLinks = (//This is just going to contain JSX
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (//This is just going to contain JSX
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    );


    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}

export default Navbar
