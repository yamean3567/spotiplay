import {  useNavigate } from 'react-router-dom';
const Register = () => {
    let navigate = useNavigate();

    return (
        <div>
            <h3>REGISTER PAGE</h3>
            <button onClick={() => navigate('/')}>Back to login</button>
        </div>
    )
}

export default Register
