import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthConsumer from '../../contexts/auth';
import { BsMusicPlayer } from 'react-icons/bs'

const Home = () => {
    const auth = AuthConsumer();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.logOut();
        navigate("/");
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-white">
            <BsMusicPlayer size={40}/>
            <div className="text-center font-bold text-2xl">
                Spotiplay
            </div>
            <div className="w-1/3 bg-white shadow-md px-8 pt-6 pb-16 text-white">
            <div className="p-1 bg-green-800 rounded-lg m-3 text-center hover:bg-green-900 ">
                <button className="font-bold py-3 rounded" onClick={() => navigate('/home/leaderboard')}>Leaderboard</button>
            </div>
            <div className="p-1 bg-green-700 rounded-lg m-3 text-center hover:bg-green-900">
                <button className="font-bold py-3 rounded" onClick={() => navigate('/home/guessthelyrics')}>Guess the Lyrics</button>
            </div>
            <div className="p-1 bg-green-600 rounded-lg m-3 text-center hover:bg-green-900">
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
