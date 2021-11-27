import React, {useState} from 'react';
import Register from '../components/Start/Register';
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';
import { createUser } from '../models/User';

const RegisterPresenter = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (email, password) => {
        try {
            setError('');
            setLoading(true);
            const {user} = await auth.signUp(email, password);
            createUser(user.uid, email);
            navigate('/home');
        } catch(e) {
            setError(e.message);
        }
        setLoading(false);
    }


    return (
        <div>
            <Register createUser={(email, password) => handleRegistration(email, password)} error={error} loading={loading}/>
        </div>
    )
}

export default RegisterPresenter
