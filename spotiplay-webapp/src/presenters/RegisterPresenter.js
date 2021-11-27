import React, {useState} from 'react';
import Register from '../components/Start/Register';
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';
import { createUser } from '../models/User';

const RegisterPresenter = () => {
    const[error, setError] = useState();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (email, password) => {
        try {
            const {user} = await auth.signUp(email, password);
            createUser(user.uid, email);
            navigate('/home');
        } catch(e) {
            setError(e.message);
        }
    }


    return (
        <div>
            <Register createUser={(email, password) => handleRegistration(email, password)} error={error}/>
        </div>
    )
}

export default RegisterPresenter
