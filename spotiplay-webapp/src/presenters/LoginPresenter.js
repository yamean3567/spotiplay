import Login from '../components/Start/Login'
import {useAuth} from '../contexts/auth';
import { useNavigate } from 'react-router';
import { useReducer } from 'react';
import {loginReducer, initialState} from '../reducers/loginReducer'

const LoginPresenter = () => {    
    const [state, dispatch] = useReducer(loginReducer, initialState)
    const { error, loading } = state;
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogin = async (email, password) => {
        try {
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
