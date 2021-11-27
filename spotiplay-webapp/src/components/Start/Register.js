import {  useNavigate } from 'react-router-dom';
import { useState } from 'react'

const Register = (props) => {
    let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    return (
        <div>
            <header>
                <b>REGISTER</b>
            </header>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => {
                props.createUser(email, password)}
                }>Create account</button>
            <div>
                <button onClick={() => navigate('/')}>Back to login</button>
            </div>
            <div>
                {props.error}
            </div>
        </div>
    )
}

export default Register
