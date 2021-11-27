import {  useNavigate } from 'react-router-dom';
import { useState } from 'react'

const Register = () => {
    let navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");

    return (
        <div>
            <header>
                <b>REGISTER</b>
            </header>
            <input placeholder="Email..." onChange={(e) => setRegisterEmail(e.target.value)}/>
            <input placeholder="Password..." onChange={(e) => setRegisterPassword(e.target.value)}/>
            <button>Create account</button>
            <div>
                <button onClick={() => navigate('/')}>Back to login</button>
            </div>
        </div>
    )
}

export default Register
