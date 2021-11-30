import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import Top from '../components/Games/Top'

const TopPresenter = () => {
    //temporary data
    const [tracks, setTracks] = useState([]);
    const [loadingTracks, setLoadingTracks] = useState(true);
    const [mounted, setMounted] = useState();
    //page 1 --> toplist
    const getTracks = async (country, amount, page) => {
        if(!mounted) return;
        const data = await MusicMatch.getTopTracks(country, 10, 1);
        setTracks(data);   //array of artists
        setLoadingTracks(false);
    }

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])


    return (
        <div>
            <Top getTracks={getTracks} tracks={tracks} tracksLoading={loadingTracks}/>
        </div>
    )
}

export default TopPresenter
