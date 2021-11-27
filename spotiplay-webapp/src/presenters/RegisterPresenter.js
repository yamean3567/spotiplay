import React, {useState} from 'react';
import Register from '../components/Start/Register';
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';

const RegisterPresenter = () => {
    const[error, setError] = useState();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (email, password) => {
        try {
            await auth.signUp(email, password);
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
