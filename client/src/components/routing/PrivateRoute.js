import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, loading } = authContext; //We want loading to not prematurely render the wrong things. 

    return (

        <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (
            <Component {...props} />
        )
        } />
    )
}

export default PrivateRoute
