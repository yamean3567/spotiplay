import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import LyricsGuesser from '../components/Games/LyricsGuesser'
import { getSentenceAndWord } from '../helpers/lyricsGuesser'

const LyricsGuesserPresenter = () => {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState();
    const [sentence, setSentence] = useState('');
    const [word, setWord] = useState('');

    //temporary function for testing
    const getSentence = async (country, amount, page) => {
        if(!mounted) return;
        const track = await MusicMatch.getTopTracks('us', 1, 1);
        const lyrics = await MusicMatch.getLyrics(track[0].track.track_id);
        const {sentence, word} = getSentenceAndWord(lyrics.lyrics_body)
        setSentence(sentence);
        setWord(word);
        setLoading(false);
    }


    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])

    return (
        <div>
           <LyricsGuesser getSentence={getSentence} data={{word: word, sentence: sentence}} loading={loading}/> 
        </div>
    )
}

export default LyricsGuesserPresenter
