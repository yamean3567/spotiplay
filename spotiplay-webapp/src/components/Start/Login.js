import {  useNavigate } from 'react-router-dom';
import { useState } from 'react'
const Login = (props) => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

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
                <button disabled={props.loading} onClick={() => {
                        props.logIn(loginEmail, loginPassword);
                    }}>Sign in</button>
            </div>
            <div>
                {props.error}
            </div>
        </div>
    )
}
export default Login