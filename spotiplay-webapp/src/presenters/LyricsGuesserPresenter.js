import React, { useEffect, useReducer, useState } from 'react'
import { getSentenceAndWord } from '../helpers/lyricsGuesser'
import { useNavigate } from 'react-router'
import TopBar from '../components/Games/TopBar';
import LyricsStart from '../components/Games/LyricsGuesser/LyricsStart';
import LyricsGame from '../components/Games/LyricsGuesser/LyricsGame';
import { lyricsGameReducer, initialState } from '../reducers/lyricsGameReducer';
import LyricsEnd from '../components/Games/LyricsGuesser/LyricsEnd';

const LyricsGuesserPresenter = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(lyricsGameReducer, initialState);
    const {loading,  sentence, word, guessedWord, started, buttonDisabled, formDisabled, currentScore, lost} = state;
    const [mounted, setMounted] = useState();
   

    //temporary function for testing
    const startGame = async () => {
        if(!mounted) return;
        dispatch({type: 'disableButton'});
        /*let country = getCountry(); 
        const track = await MusicMatch.getTopTracks(country, 10, 1);
        const lyrics = await MusicMatch.getLyrics(track[0].track.track_id);*/
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'startGame', payload: {sentence: sentence, word: word.toLowerCase()}});
    }

    const guessWord = async (e) => {
        e.preventDefault();
        if(!mounted) return;
        if(guessedWord === '') return;
        dispatch({type: 'disableForm'});
        if(word === guessedWord.toLowerCase()){
            //rätt svar
            /*let country = getCountry(); 
            const track = await MusicMatch.getTopTracks(country, 10, 1);
            const lyrics = await MusicMatch.getLyrics(track[1].track.track_id);*/
            const {sentence, word} = await getSentenceAndWord();
            setTimeout(()=> dispatch({type: 'correctAnswer', payload: {currentScore: currentScore+1, sentence: sentence, word: word.toLowerCase()}}), 3000);
        } else {
            //lite databas fetching, uppdatera highscore om nödvändigt etc
            setTimeout(() => dispatch({type: 'lostGame'}), 3000);
        }
    } 

    const restartGame = async () => {
        dispatch({type: 'disableButton'});
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'restartGame', payload: {sentence: sentence, word: word}});
    }
    
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div>
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {(!started && <LyricsStart startGame={startGame} disabled={buttonDisabled}/>) 
            || (!lost && <LyricsGame text={state.guessedWord} 
                                    setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                    guessWord={guessWord} data={{word: word, sentence: sentence}} 
                                    loading={loading}
                                    currentScore={currentScore}
                                    formDisabled={formDisabled}/>)
                                    
            || <LyricsEnd disabled={buttonDisabled} score={currentScore} navigate={navigate} restartGame={restartGame}/>}
        </div>
    )
}

export default LyricsGuesserPresenter
