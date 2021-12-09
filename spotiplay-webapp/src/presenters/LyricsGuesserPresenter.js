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
    const { loading,  sentence, word, guessedWord, started, buttonDisabled, 
            formDisabled, currentScore, lost, restartTime, startTime, gameTime,
                startColor, artist, track, album, scoreTimer, newPoints} = state;
   
    //Handler for guessing word
    const guessWord = async (e) => {
        e.preventDefault();
        if(!mounted) return;
        if(guessedWord === '') return;
        dispatch({type: 'disableForm'});
        if(word.word1.toLowerCase() === guessedWord.toLowerCase() || word.word2.toLowerCase() === guessedWord.toLowerCase()) {
            //rätt svar
            const {sentence, word, artist, track, album} = await getSentenceAndWord();
            let newPoints = scoreTimer <= 0 ? 100 : scoreTimer*100 + Math.floor(Math.random() * 40); 
            setTimeout(() => dispatch({type: 'correctAnswer', payload: {gameTime: gameTime + 5, scoreTimer: 10, currentScore: currentScore + newPoints, newPoints: newPoints, sentence: sentence, word: word, artist: artist, track: track, album: album}}), 200);
        } else {
            setTimeout(() => dispatch({type: 'wrongAnswer', payload: {gameTime: gameTime-3, scoreTimer: scoreTimer}}), 200)
        }
    } 
    
    const restartGame = async () => {
        const {sentence, word, artist, track, album} = await getSentenceAndWord();
        dispatch({type: 'restartGame', payload: {sentence: sentence, word: word, gameTime: 300, artist: artist, track: track, album: album, scoreTimer: 10, newPoints: null}});
    }

    const startGame = async () => {
        const {sentence, word, artist, track, album} = await getSentenceAndWord();
        dispatch({type: 'startGame', payload: {sentence: sentence, word: word, gameTime: 300, artist: artist, track: track, album: album, scoreTimer: 10, newPoints: null}});
    }

    //START-GAME
    useEffect(() => {
        if(startTime === 0) return;
        if(startTime === 1) setTimeout(() => startGame(), 500); 
        const intervalId = setInterval(() => {
            dispatch({type: 'loadStart', payload: {startTime: startTime - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
    }, [startTime])

    //RESTART-GAME
    useEffect(() => {
        if(restartTime === -1) return;
        if(restartTime === 0) restartGame();
        const intervalId = setInterval(() => {
            dispatch({type: 'loadRestart', payload: {restartTime: restartTime - 1}});
        }, 1000);
        return () => {clearInterval(intervalId)};
    }, [restartTime])

    //GAME TIMER
    useEffect(() => {
        if(gameTime === -10000)  return;
        if(gameTime <= 0) setTimeout(() => dispatch({type: 'lostGame'}));
        const intervalId = setInterval(() => {
            if(gameTime <= 0) {
                return;
            }
            dispatch({type: 'gameTick', payload: {gameTime: gameTime - 1, scoreTimer: scoreTimer - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
    }, [gameTime, scoreTimer])

    //Clean up
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {(!started && <LyricsStart color={startColor} startGame={() => dispatch({type: 'loadStart', payload: {startTime: 3}})} time={startTime} disabled={buttonDisabled}/>) 
            || (!lost && <LyricsGame text={state.guessedWord} 
                                    setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                    guessWord={guessWord} data={{word: word.word1, sentence: sentence, artist: artist, track: track, album: album}} 
                                    loading={loading}
                                    currentScore={currentScore}
                                    gameTime={gameTime}
                                    formDisabled={formDisabled}
                                    score={newPoints}
            />)
                                    
            || <LyricsEnd disabled={buttonDisabled} score={currentScore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default LyricsGuesserPresenter
