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
    const [mounted, setMounted] = useState();
    const [state, dispatch] = useReducer(lyricsGameReducer, initialState);
    const {loading,  sentence, word, guessedWord, started, buttonDisabled, formDisabled, currentScore, lost, restartTime, startTime} = state;
   
    //Handler for guessing word
    const guessWord = async (e) => {
        e.preventDefault();
        if(!mounted) return;
        if(guessedWord === '') return;
        dispatch({type: 'disableForm'});
        if(word === guessedWord.toLowerCase()){
            //rätt svar
            const {sentence, word} = await getSentenceAndWord();
            setTimeout(()=> dispatch({type: 'correctAnswer', payload: {currentScore: currentScore+1, sentence: sentence, word: word.toLowerCase()}}), 3000);
        } else {
            //lite databas fetching, uppdatera highscore om nödvändigt etc
            setTimeout(() => dispatch({type: 'lostGame'}), 3000);
        }
    } 

    //Handler for restarting game
    const restartGame = async () => {
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'restartGame', payload: {sentence: sentence, word: word}});
    }
    
    //Handler for starting game
    const startGame = async () => {
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'startGame', payload: {sentence: sentence, word: word.toLowerCase()}});
    }

    //Start-game timer (count down for starting game)
    useEffect(() => {
        if(startTime === -1) return;
        if(startTime === 0) startGame(); 
        const intervalId = setInterval(() => {
            dispatch({type: 'loadStart', payload: {startTime: startTime - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
    },[startTime])

    //Restart-game timer (count down for restarting game)
    useEffect(() => {
        if(restartTime === -1) return;
        if(restartTime === 0) restartGame();
        const intervalId = setInterval(() => {
            dispatch({type: 'loadRestart', payload: {restartTime: restartTime - 1}});
        }, 1000)
        return () => clearInterval(intervalId);
    }, [restartTime])

    //Clean up
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div>
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {(!started && <LyricsStart startGame={() => dispatch({type: 'loadStart', payload: {startTime: 5}})} time={startTime} disabled={buttonDisabled}/>) 
            || (!lost && <LyricsGame text={state.guessedWord} 
                                    setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                    guessWord={guessWord} data={{word: word, sentence: sentence}} 
                                    loading={loading}
                                    currentScore={currentScore}
                                    formDisabled={formDisabled}/>)
                                    
            || <LyricsEnd disabled={buttonDisabled} score={currentScore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default LyricsGuesserPresenter
