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
         try {
            if(!mounted) return;
            dispatch({type: 'login'});
            await auth.logIn(email, password);
            dispatch({type: 'success'});
            navigate('/home');
        } catch(e) {
            console.log(e.code);
            let passErr = null;
            let emailErr = null;
            switch (e.code) {
                case 'auth/invalid-email':
                    if(password.length < 6) {
                        passErr = 'Please enter your password'
                    }
                    if(email.length === 0) {
                        emailErr = 'Please enter your email'
                    } else {
                        emailErr = 'Could not find your spotiplay email'
                    }
                    dispatch({type: 'error', payload: {passErr: passErr, emailErr: emailErr}})
                    break;
                case 'auth/wrong-password':
                    passErr = 'Wrong password'
                    dispatch({type: 'error', payload: {emailErr: emailErr, passErr: passErr, payload: {emailErr: emailErr, passErr: passErr}}})
                    break;
                default:
                    break;
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
