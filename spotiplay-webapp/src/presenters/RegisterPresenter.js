import React from 'react'
import Register from '../components/Start/Register'
import {useAuth} from '../contexts/auth'

const RegisterPresenter = () => {
    const auth = useAuth();

    const handleRegistration = (email, password) => {
        auth.signUp(email, password);
    }


    return (
        <div>
            <Register createUser={(email, password) => handleRegistration(email, password)} error={auth.error}/>
        </div>
    )
}

export default RegisterPresenter
