
import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import HigherLower from '../components/Games/HigherLower/HigherLowerGame'

const HigherLowerPresenter = () => {
    //temporary data
    const [tracks, setTracks] = useState([]);
    const [loadingTracks, setLoadingTracks] = useState(true);
    const [mounted, setMounted] = useState();
    const [artists, setArtists] = useState([]);
    const [loadingArtists, setLoadingArtists] = useState(true);
    //page 1 --> toplist
    const getTracks = async (country, amount, page) => {
        if(!mounted) return;
        const data = await MusicMatch.getTopTracks('us', 10, 1);
        setTracks(data);   //array of artists
        setLoadingTracks(false);
    }

    const getArtists = async (country, amount, page) => {
        if(!mounted) return;
        const data = await MusicMatch.getTopArtists('us', 10, 1);
        setArtists(data);
        setLoadingArtists(false);
    }

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])


    return (
        <div>
            <HigherLower getTracks={getTracks} tracks={tracks} tracksLoading={loadingTracks}
                        getArtists={getArtists} artists={artists} artistsLoading={loadingArtists}
            />
        </div>
    )
}

export default HigherLowerPresenter
