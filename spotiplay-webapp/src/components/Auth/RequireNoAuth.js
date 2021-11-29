import React from 'react'
import { Navigate } from 'react-router-dom';
import AuthConsumer from '../../contexts/auth';

const RequireNoAuth = ({children}) => {
    const auth = AuthConsumer();    
    return auth.currentUser !== null ? <Navigate to="/home"/>: children;
}

export default RequireNoAuth
