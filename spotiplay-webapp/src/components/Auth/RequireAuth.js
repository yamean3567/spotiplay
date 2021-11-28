import React from 'react'
import {useAuth} from '../../contexts/auth'
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const auth = useAuth();
    /*
        Save location of where user tries to enter. If user is unauthed,
        make them authenticate themselves, and then route them to the page
        they were originally trying to visit.
    */
    const location = useLocation(); 
    return auth.currentUser !== null ? children : <Navigate to="/" replace state={{path: location.pathname}}/>;
}

export default RequireAuth
