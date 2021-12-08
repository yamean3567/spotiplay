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
        <div className="h-screen flex flex-col justify-center items-center bg-white">
            <div className="rounded-lg text-white">
            <div className="p-3.5 bg-green-900 rounded-lg">
                {auth.currentUser !== null && <button className="font-bold py-3 rounded" onClick={() => handleLogout()} >Logout</button>}
            </div>
            <div className="p-3.5 bg-green-800 rounded-lg">
                <button className="font-bold py-3 rounded" onClick={() => {updateRating(auth.currentUser.uid, 2000);}}>change rating once</button>
            </div>
            <div className="p-3.5 bg-green-700 rounded-lg">
                <button className="font-bold py-3 rounded" onClick={() => navigate('/home/guessthelyrics')}>Guess the lyrics</button>
            </div>
            <div className="p-3.5 bg-green-600 rounded-lg">
                <button className="font-bold py-3 rounded" onClick={() => navigate('/home/higherlower')}>Higher or lower</button>
            </div>
            </div>
        </div>
    )
}

export default Home
