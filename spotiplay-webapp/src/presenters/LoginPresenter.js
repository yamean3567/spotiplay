import Login from '../components/Start/Login'
import { useNavigate } from 'react-router';
import { useContext, useEffect, useReducer, useState } from 'react';
import {loginReducer, initialState} from '../reducers/loginReducer'
import { AuthContext } from '../contexts/auth'

const LoginPresenter = () => {    
    const [state, dispatch] = useReducer(loginReducer, initialState)
    const [mounted, setMounted] = useState();
    const { error, loading } = state;
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])    

    const handleLogin = async (email, password) => {
        try {
            if(!mounted) return;
            dispatch({type: 'login'});
            await auth.logIn(email, password);
            dispatch({type: 'success'});
            navigate('/home');
        } catch(e) {
            dispatch({type: 'error'})
        }
    }

    return (
        <div>
            <Login logIn={(email, password) => handleLogin(email, password)} error={error} loading={loading}/>
        </div>
    )
}

export default LoginPresenter
