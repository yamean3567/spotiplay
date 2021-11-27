import Login from '../components/Start/Login'
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';
import { useState } from 'react';
const LoginPresenter = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogin = async (email, password) => {
        try {
            await auth.logIn(email, password);
            navigate('/home');
        } catch(e) {
            setError(e.message);
        }
    }
    return (
        <div>
            <Login logIn={(email, password) => handleLogin(email, password)} error={error}/>
        </div>
    )
}

export default LoginPresenter
