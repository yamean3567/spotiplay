import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/auth'
import { updateRating } from '../../models/User';
import { MusicMatch } from '../../apis/MusicMatch/musicMatch';

const Home = () => {
    const [data, setData] = useState(null);
    const [mounted, setMounted] = useState();
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.logOut();
        navigate("/");
    }

    const fetchData = async () => {
        if(!mounted) return;
        const temp = await MusicMatch.getTopTracks('us', 8, 2);
        setData(temp);
        console.log(temp);
        setLoading(false);
    }

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])

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
                <button onClick={() => fetchData()}>Press to get top song in US</button>
            </div>
            <div>
                {!loading && data && <div>{data.message.body.track_list[0].track.track_name}</div>}
            </div>
            <div></div>
        </div>
    )
}

export default Home
