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
        <div className="h-screen flex flex-col justify-center items-center bg-black bg-gradient-to-t from-gray-900 to-black">
            <BsMusicPlayer style={{color: 'white'}} size={40}/>
            <div className="w-1/3 bg-white grid justify-center px-8 pt-8 pb-8 text-white rounded-xl bg-gradient-to-t from-green-900 to-black-300">
                <div className="text-center mb-8 font-bold text-white text-2xl">
                    Spotiplay
                </div>
                <button className="font-bold px-8 py-3 bg-green-900 rounded text-sm hover:bg-black hover:text-yellow-500" onClick={() => navigate('/home/leaderboard')}>Leaderboard</button>
                <button className="font-bold px-8 px-3 py-3 bg-green-800 text-sm mt-3 rounded hover:bg-black hover:text-green-500" onClick={() => navigate('/home/guessthelyrics')}>Play Guess the Lyrics</button>
                <button className="font-bold px-8 py-3 bg-green-700 text-sm mt-3 rounded hover:bg-black hover:text-green-400" onClick={() => navigate('/home/higherlower')}>Play Higher or Lower</button>
            </div>
                {auth.currentUser !== null && <button className="font-bold bg-green-800 mt-3 p-2 rounded text-xs text-white hover:bg-red-700 hover:text-black" onClick={() => handleLogout()} >Logout</button>}
        </div>
    )
}

export default Home
