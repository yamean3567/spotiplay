import React, { useContext }from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'

const RequireNoAuth = ({children}) => {
    const auth = useContext(AuthContext);    
    return auth.currentUser !== null ? <Navigate to="/home"/>: children;
}

export default RequireNoAuth
