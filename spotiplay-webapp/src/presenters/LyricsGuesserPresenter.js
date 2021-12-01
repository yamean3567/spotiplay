import React, { useEffect, useReducer, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import { getSentenceAndWord , getCountry} from '../helpers/lyricsGuesser'
import { useNavigate } from 'react-router'
import TopBar from '../components/Games/TopBar';
import LyricsStart from '../components/Games/LyricsGuesser/LyricsStart';
import LyricsGame from '../components/Games/LyricsGuesser/LyricsGame';
import { lyricsGameReducer, initialState } from '../reducers/lyricsGameReducer';


const LyricsGuesserPresenter = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(lyricsGameReducer, initialState);
    const {loading,  sentence, word, guessedWord, started, disabled, currentScore} = state;
    const [mounted, setMounted] = useState();
   

    //temporary function for testing
    const startGame = async () => {
        if(!mounted) return;
        dispatch({type: 'disableButton'});
        let country = getCountry(); 
        const track = await MusicMatch.getTopTracks(country, 10, 1);
        const lyrics = await MusicMatch.getLyrics(track[0].track.track_id);
        const {sentence, word} = getSentenceAndWord(lyrics.lyrics_body)
        dispatch({type: 'startGame', payload: {sentence: sentence, word: word}});
    }

    const guessWord = async (e) => {
        if(!mounted) return;
        e.preventDefault();
        if(word === guessedWord){
            //rätt svar
            let country = getCountry(); 
            const track = await MusicMatch.getTopTracks(country, 10, 1);
            const lyrics = await MusicMatch.getLyrics(track[1].track.track_id);
            const {sentence, word} = getSentenceAndWord(lyrics.lyrics_body)
            dispatch({type: 'correctAnswer', payload: {currentScore: currentScore+1, sentence: sentence, word: word}});
        } else {
            //förlorar
            //setStarted(false);
            //setGuessedWord('');
            
        }
    } 

    
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div>
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {!started ? <LyricsStart startGame={startGame} disabled={disabled}/>
                            : <LyricsGame text={state.guessedWord} 
                                        setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                        guessWord={guessWord} data={{word: word, sentence: sentence}} 
                                        loading={loading}
                                        currentScore={currentScore}
                                />}
        </div>
    )
}

export default LyricsGuesserPresenter
