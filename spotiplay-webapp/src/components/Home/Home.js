import React from 'react'
import { useNavigate } from 'react-router-dom'
import { updateRating } from '../../models/User';
import AuthConsumer from '../../contexts/auth';
const Home = () => {
    const auth = AuthConsumer();
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
            <div>
                <button onClick={() => navigate('/home/guessthelyrics')}>Guess the lyrics</button>
            </div>
            <div>
                <button onClick={() => navigate('/home/higherlower')}>Higher or lower</button>
            </div>
        </div>
    )
}

export default Home
