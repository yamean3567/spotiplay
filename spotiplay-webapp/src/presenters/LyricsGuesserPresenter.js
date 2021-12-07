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
    const {loading,  sentence, word, guessedWord, started, buttonDisabled, 
            formDisabled, currentScore, lost, restartTime, startTime, gameTime,
                startColor} = state;
   
    //Handler for guessing word
    const guessWord = async (e) => {
        e.preventDefault();
        if(!mounted) return;
        if(guessedWord === '') return;
        dispatch({type: 'disableForm'});
        if(word === guessedWord.toLowerCase()) {
            //rätt svar
            //console.log("word:", word);
            //console.log("guessedword:", guessedWord);
            const {sentence, word} = await getSentenceAndWord();
            setTimeout(() => dispatch({type: 'correctAnswer', payload: {gameTime: gameTime + 5, currentScore: currentScore+1, sentence: sentence, word: word.toLowerCase()}}), 500);
        } else {
            setTimeout(() => dispatch({type: 'wrongAnswer', payload: {gameTime: gameTime-3}}), 500)
            //lite databas fetching, uppdatera highscore om nödvändigt etc
        }
    } 

    //Handler for restarting game
    const restartGame = async () => {
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'restartGame', payload: {sentence: sentence, word: word, gameTime: 10}});
    }
    
    //Handler for starting game
    const startGame = async () => {
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'startGame', payload: {sentence: sentence, word: word.toLowerCase(), gameTime: 10}});
    }

    //Start-game timer (count down for starting game)
    useEffect(() => {
        if(startTime === 0) return;
        if(startTime === 1) setTimeout(() => startGame(), 500); 
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
        }, 1000);
        return () => clearInterval(intervalId);
    }, [restartTime])

    useEffect(() => {
        if(gameTime === -10000)  return;
        if(gameTime <= 0) setTimeout(() => dispatch({type: 'lostGame'}));
        const intervalId = setInterval(() => {
            if(gameTime <= 0) {
                return;
            }
            dispatch({type: 'gameTick', payload: {gameTime: gameTime - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
    }, [gameTime])

    //Clean up
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div>
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {(!started && <LyricsStart color={startColor} startGame={() => dispatch({type: 'loadStart', payload: {startTime: 3}})} time={startTime} disabled={buttonDisabled}/>) 
            || (!lost && <LyricsGame text={state.guessedWord} 
                                    setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                    guessWord={guessWord} data={{word: word, sentence: sentence}} 
                                    loading={loading}
                                    currentScore={currentScore}
                                    gameTime={gameTime}
                                    formDisabled={formDisabled}/>)
                                    
            || <LyricsEnd disabled={buttonDisabled} score={currentScore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default LyricsGuesserPresenter
