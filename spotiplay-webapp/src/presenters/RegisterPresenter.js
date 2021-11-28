import React, { useReducer } from 'react';
import Register from '../components/Start/Register';
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';
import { createUser } from '../models/User';
import { registrationReducer, initialState } from '../reducers/registrationReducer'

const RegisterPresenter = () => {
    const [state, dispatch] = useReducer(registrationReducer, initialState)
    const { error, loading } = state;
    const auth = useAuth();
    const navigate = useNavigate();

    const handleRegistration = async (email, password) => {
        try {
            dispatch({type: 'register'})
            const {user} = await auth.signUp(email, password);
            createUser(user.uid, email);
            dispatch({type: 'success'});
            navigate('/home');
        } catch(e) {
            dispatch({type: 'error'});
        }
    }

    return (
        <div>
            <Register createUser={(email, password) => handleRegistration(email, password)} error={error} loading={loading}/>
        </div>
    )
}

export default RegisterPresenter
