import {  useNavigate } from 'react-router-dom';
import { useState } from 'react'
const Login = () => {
    let navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassowrd, setLoginPassword] = useState("");

    return (
        <div>
            <header>
                <b>SPOTIPLAY</b>
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/about')}>About</button>
            </header>
            <input placeholder="Email..." onChange={(e) => setLoginEmail(e.target.value)}/>
            <input placeholder="Password..." onChange={(e) => setLoginPassword(e.target.value)}/>
            <div>
                <button>Sign in</button>
            </div>
        </div>
    )
}
export default Login