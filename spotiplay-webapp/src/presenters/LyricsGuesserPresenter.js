import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import LyricsGuesser from '../components/Games/LyricsGuesser'
import { getSentenceAndWord , getCountry} from '../helpers/lyricsGuesser'

const LyricsGuesserPresenter = () => {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState();
    const [sentence, setSentence] = useState('');
    const [word, setWord] = useState('');
    const [guessedWord, setGuessedWord] = useState('');
    const [flag, setFlag] = useState(true);

    //temporary function for testing
    const startGame = async () => {
        if(!mounted) return;
        let country = getCountry(); 
        const track = await MusicMatch.getTopTracks(country, 10, 1);
        console.log(track);
        const lyrics = await MusicMatch.getLyrics(track[0].track.track_id);
        const {sentence, word} = getSentenceAndWord(lyrics.lyrics_body)
        setSentence(sentence);
        setWord(word);
        setLoading(false);
    }

    const guessWord = (e) => {
        if(!mounted) return;
        e.preventDefault();
        if(word === guessedWord){
            console.log("yee");
        } else {
            setFlag(false);
            setGuessedWord('');
            
        }
    } 

    
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])

    return (
        <div>
           <LyricsGuesser startGame={startGame} flag={flag} setGuessedWord={setGuessedWord} guessWord={guessWord} data={{word: word, sentence: sentence}} loading={loading}
                         setFlag={setFlag}
           /> 
        </div>
    )
}

export default LyricsGuesserPresenter
