import Login from '../components/Start/Login'
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';
import { useState } from 'react';
const LoginPresenter = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            setError('');
            await auth.logIn(email, password);
            navigate('/home');
        } catch(e) {
            setError(e.message);
        }
        setLoading(false);
    }
    return (
        <div>
            <Login logIn={(email, password) => handleLogin(email, password)} error={error} loading={loading}/>
        </div>
    )
}

export default LoginPresenter
