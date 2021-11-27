import {  useNavigate } from 'react-router-dom';
const Login = () => {
    let navigate = useNavigate();

    return (
        <div>
            <h3>LOGIN PAGE</h3>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/about')}>About</button>
        </div>
    )
}
export default Login