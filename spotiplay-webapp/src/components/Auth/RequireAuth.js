import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'

const RequireAuth = ({children}) => {
    const auth = useContext(AuthContext);
    /*
        Save location of where user tries to enter. If user is unauthed,
        make them authenticate themselves, and then route them to the page
        they were originally trying to visit.
    */
    const location = useLocation(); 
    return auth.currentUser !== null ? children : <Navigate to="/" replace state={{path: location.pathname}}/>;
}

export default RequireAuth
