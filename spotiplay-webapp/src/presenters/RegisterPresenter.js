import React, { useContext, useEffect, useReducer, useState } from 'react';
import Register from '../components/Start/Register';
import { AuthContext } from '../contexts/auth';
import { useNavigate } from 'react-router';
import { createUser } from '../models/User';
import { registrationReducer, initialState } from '../reducers/registrationReducer'

const RegisterPresenter = () => {
    const [state, dispatch] = useReducer(registrationReducer, initialState)
    const [mounted, setMounted] = useState();
    const { loading, email, pass1, pass2, emailError, passwordError } = state;
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])

    const handleRegistration = async () => {
        dispatch({type: 'error', payload: {emailErr: '', passwordErr: ''}})
        if(email === '') {
            dispatch({type: 'error', payload: {emailErr: 'Please enter your email', passErr: pass1 === '' && pass1 === '' ? 'Please enter your password' : ''}})
            return;
        }
        if(pass1 === '' || pass2 === ''){
            dispatch({type: 'error', payload: {passErr: 'Please enter your password', emailErr: email === '' ? 'Please enter your email' : ''}}) 
            return;
        }
        if(pass1 !== pass2) {
            dispatch({type: 'error', payload: {passErr: 'Passwords do not match'}, emailErr: email === '' ? 'Please enter your email' : ''})
            return;
        }

        try {
            if(!mounted) return;
            dispatch({type: 'register'})
            const {user} = await auth.signUp(email, pass1);
            createUser(user.uid, email);
            dispatch({type: 'success'});
            navigate('/home');
        } catch(e) {
            console.log(e.code);
            switch (e.code) {
                case 'auth/missing-email':
                    dispatch({type: 'error', payload: {emailErr: 'Please enter your email'}})
                    return;
                case 'auth/invalid-email': 
                    dispatch({type: 'error', payload: {emailErr: 'Invalid email'}})
                    return;
                case 'auth/weak-password':
                    dispatch({type: 'error', payload: {passErr: 'Password needs to be atleast 6 characters'}})
                    return;
                case 'auth/email-already-in-use': {
                    dispatch({type: 'error', payload: {emailErr: 'Email already in use'}})
                    return;
                }
                default:
                    console.log(e.code);
                    dispatch({type: 'error', payload: {emailErr: 'We are currently experiencing issues, please try again later'}})
            }
        }
    }

    return (
        <div>
            <Register setEmail={email => dispatch({type: 'setEmail', payload: {email: email}})} navigation={(path) => navigate(path)} 
                        setPassword1={pass1 => dispatch({type: 'setPass1', payload: {pass1: pass1}})}
                        setPassword2={pass2 => dispatch({type: 'setPass2', payload: {pass2: pass2}})}
                        emailError={emailError}
                        passwordError={passwordError}
                        createUser={() => handleRegistration()} error={{emailError, passwordError}} loading={loading}/>
        </div>
    )
}

export default RegisterPresenter
