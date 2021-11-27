import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/auth'
import { updateRating } from '../../models/User';

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
            Update rating test 
            <div>
                <button onClick={() => {updateRating(auth.currentUser.uid, 2000);}}>change rating once</button>
            </div>
        </div>
    )
}

export default Home
