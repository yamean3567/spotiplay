import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/auth'

const Home = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logOut();
        navigate("/");
    }

    return (
        <div>
            Wow we're logged in and protected!
            <div>
                {auth.currentUser !== null && <button onClick={() => handleLogout()}>Logout</button>}
            </div>
        </div>
    )
}

export default Home
