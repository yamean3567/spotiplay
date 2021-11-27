import Login from '../components/Start/Login'
import {useAuth} from '../contexts/auth';

const LoginPresenter = () => {
    const auth = useAuth();
    const handleLogin = (email, password) => {
        auth.logIn(email, password);
    }
    return (
        <div>
            <Login logIn={(email, password) => handleLogin(email, password)} error={auth.error}/>
        </div>
    )
}

export default LoginPresenter
