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
            <div className="w-1/3 bg-white shadow-md px-8 pt-6 pb-16 text-white">
            <div className="p-1 bg-green-800 rounded-lg m-3 text-center">
                <button className="font-bold py-3 rounded" onClick={() => {updateRating(auth.currentUser.uid, 2000);}}>change rating once</button>
            </div>
            <div className="p-1 bg-green-700 rounded-lg m-3 text-center">
                <button className="font-bold py-3 rounded" onClick={() => navigate('/home/guessthelyrics')}>Guess the Lyrics</button>
            </div>
            <div className="p-1 bg-green-600 rounded-lg m-3 text-center">
                <button className="font-bold py-3 rounded" onClick={() => navigate('/home/higherlower')}>Higher or Lower</button>
            </div>
            </div>
            <div className="float-right bg-white rounded-lg m-3">
                {auth.currentUser !== null && <button className="font-bold py-3 rounded hover:text-green-700" onClick={() => handleLogout()} >Logout</button>}
            </div>
        </div>
    )
}

export default Home
