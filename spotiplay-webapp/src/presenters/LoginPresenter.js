import Login from '../components/Start/Login'
import { useNavigate } from 'react-router';
import { useContext, useEffect, useReducer, useState } from 'react';
import {loginReducer, initialState} from '../reducers/loginReducer'
import { AuthContext } from '../contexts/auth'

const LoginPresenter = () => {    
    const [state, dispatch] = useReducer(loginReducer, initialState)
    const [mounted, setMounted] = useState();
    const { emailError, passwordError, loading, email, password } = state;
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])    

    const handleLogin = async () => {
        dispatch({type: 'error', payload: {emailErr: '', passwordErr: ''}})
        if(email === '' && password === '') {
            dispatch({type: 'error', payload: {emailErr: 'Please enter your email', passErr: 'Please enter your password'}})
            console.log("hej")
            return;
        }
        try {
            if(!mounted) return;
            dispatch({type: 'login'});
            await auth.logIn(email, password);
            dispatch({type: 'success'});
            navigate('/home');
        } catch(e) {
            let passErr = '';
            let emailErr = '';
            switch (e.code) {
                case 'auth/invalid-email':
                    dispatch({type: 'error', payload: {passErr: passErr, emailErr: 'Invalid email'}})
                    return;
                case 'auth/too-many-requests': {
                    dispatch({type: 'error', payload: {emailErr: 'Too many failed attemps, try again later', passErr: 'Too many failed attemps, try again later'}})
                    return;
                }
                default:
                    if(password === '') passErr = 'Please enter your password';
                    dispatch({type: 'error', payload: {emailErr: emailErr, passErr: passErr === '' ? 'Incorrect password' : passErr}})
                    return;
            }
        }
    }

    return (
        <div>
            <Login navigation={(path) => navigate(path)} email={email} setEmail={email => dispatch({type: 'setEmail', payload: {email: email}})} 
                    setPassword={pass => dispatch({type: 'setPassword', payload: {password: pass}})} logIn={() => handleLogin()} error={{emailError, passwordError}} loading={loading}/>
        </div>
    )
}

export default LoginPresenter
