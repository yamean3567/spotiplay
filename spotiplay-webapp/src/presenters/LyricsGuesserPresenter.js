import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import LyricsGuesser from '../components/Games/LyricsGuesser'

const LyricsGuesserPresenter = () => {
    const [lyrics, setLyrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState();

    const getLyrics = async (country, amount, page) => {
        if(!mounted) return;
        const track = await MusicMatch.getTopTracks('us', 1, 1);
        const lyrics = await MusicMatch.getLyrics(track[0].track.track_id);
        setLyrics(lyrics);
        setLoading(false);
    }


    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])

    return (
        <div>
           <LyricsGuesser getLyrics={getLyrics} lyrics={lyrics} loading={loading}/> 
        </div>
    )
}

export default LyricsGuesserPresenter
