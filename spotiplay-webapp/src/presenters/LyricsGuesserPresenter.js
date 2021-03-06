import React, { useEffect, useReducer, useState } from 'react'
import { getSentenceAndWord } from '../helpers/lyricsGuesser'
import { useNavigate } from 'react-router'
import TopBar from '../components/Games/TopBar';
import LyricsStart from '../components/Games/LyricsGuesser/LyricsStart';
import LyricsGame from '../components/Games/LyricsGuesser/LyricsGame';
import { lyricsGameReducer, initialState } from '../reducers/lyricsGameReducer';
import LyricsEnd from '../components/Games/LyricsGuesser/LyricsEnd';
import AuthConsumer from '../contexts/auth';
import { getScore, updateScore } from '../models/User';

const LyricsGuesserPresenter = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(lyricsGameReducer, initialState);
    const [mounted, setMounted] = useState(true);
    const { sentence, word, guessedWord, started, buttonDisabled, 
            formDisabled, currentScore, lost, restartTime, startTime, gameTime,
            startColor, artist, track, album, scoreTimer, newPoints,
            beatHighscore, loadingMsg, scoreColor} = state;
    const { currentUser } = AuthConsumer();

    //Handler for guessing word
    const guessWord = async (e) => {
        try {
            e.preventDefault();
            if(guessedWord === '') return;
            dispatch({type: 'disableForm', payload:{loadingMsg: "Guessing.."}});
            if(word.word1.toLowerCase() === guessedWord.toLowerCase() || word.word2.toLowerCase() === guessedWord.toLowerCase()) {
                //rätt svar
            
                const {sentence, word, artist, track, album} = await getSentenceAndWord();
                let newPoints = scoreTimer <= 0 ? 100 : scoreTimer*100 + Math.floor(Math.random() * 40);
                setTimeout(() => {
                    dispatch({type: 'correctAnswer', payload: {gameTime: gameTime + 5, scoreTimer: 10, currentScore: currentScore + newPoints, newPoints: newPoints}});
                    dispatch({type:'setTrack', payload: {sentence: sentence, word: word, artist: artist, track: track, album: album}}) 
                }, 200);
            } else {
                setTimeout(() => dispatch({type: 'wrongAnswer', payload: {gameTime: gameTime-3, scoreTimer: scoreTimer}}), 200)
            }
        } catch {
            //intentionally left blank
        }
    }

    //Handler for skipping track
    const skipTrack = async () => {
        try {
            dispatch({type: 'disableForm', payload: {loadingMsg: 'Skipping..'}});
            if(currentScore < 400) {
                lostGame();
                return;
            }
            const {sentence, word, artist, track, album} = await getSentenceAndWord(); 
            setTimeout(() => {
                dispatch({type: 'skipTrack', payload: {scoreTimer: 10, currentScore: currentScore - 400, newPoints: 400}});
                dispatch({type:'setTrack', payload: {sentence: sentence, word: word, artist: artist, track: track, album: album}})    
                }, 200);
        } catch {
            //intentionally left blank
        } 
    }
    
    //Handler for losing game
    const lostGame = async () => {
        try{
            let prevScore = await getScore(currentUser.uid, "LG");
            let beat = false;
            if(prevScore < currentScore){
                updateScore(currentUser.uid, currentScore, "LG");
                beat = true;
            } 
            dispatch({type: 'lostGame', payload: {beatHighscore: beat}});
        } catch {
            //intentionally left blank
        }
    }
    
    //Handler for restarting game
    const restartGame = async () => {
        try {
            const {sentence, word, artist, track, album} = await getSentenceAndWord();
            dispatch({type:'setTrack', payload: {sentence: sentence, word: word, artist: artist, track: track, album: album}}) 
            dispatch({type: 'restartGame', payload: {gameTime: 10, scoreTimer: 10, newPoints: null}});
        } catch {
            //intentionally left blank
        }
    }

    //Handler for starting game
    const startGame = async () => {
        try {
            const {sentence, word, artist, track, album} = await getSentenceAndWord();
            dispatch({type:'setTrack', payload: {sentence: sentence, word: word, artist: artist, track: track, album: album}}) 
            dispatch({type: 'startGame', payload: {gameTime: 10, scoreTimer: 10, newPoints: null}});
        } catch {
            //intentionally left blank
        }
    }

    //START-GAME timer
    useEffect(() => {
        if(startTime === 0 || !mounted) return;
        if(startTime === 1) setTimeout(() => startGame(), 500); 
        const intervalId = setInterval(() => {
            dispatch({type: 'loadStart', payload: {startTime: startTime - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
    }, [startTime, mounted])

    //RESTART-GAME timer
    useEffect(() => {
        if(restartTime === -1 || !mounted) return;
        if(restartTime === 0) {restartGame();}
        const intervalId = setInterval(() => {
            dispatch({type: 'loadRestart', payload: {restartTime: restartTime - 1, newPoints: null}});
        }, 1000);
        return () => clearInterval(intervalId);
    }, [restartTime, mounted])

    //GAME timer
    useEffect(() => {
        if(gameTime === -10000 || !mounted)  return;
        if(gameTime <= 0) lostGame();
        const intervalId = setInterval(() => {
            if(gameTime <= 0) {
                return;
            }
            dispatch({type: 'gameTick', payload: {gameTime: gameTime - 1, scoreTimer: scoreTimer - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameTime, scoreTimer, mounted])

    //cleanup
    useEffect(() => {
        return () => setMounted(false);
    }, [])

    return (
        <div className="h-screen overflow-hidden md:h-screen ">
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {(!started && <LyricsStart color={startColor} startGame={() => dispatch({type: 'loadStart', payload: {startTime: 3}})} time={startTime} disabled={buttonDisabled}/>) 
            || (!lost && <LyricsGame text={state.guessedWord} 
                                    setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                    guessWord={guessWord} data={{word: word.word1, sentence: sentence, artist: artist, track: track, album: album}} 
                                    currentScore={currentScore}
                                    gameTime={gameTime}
                                    formDisabled={formDisabled}
                                    score={newPoints}
                                    skipTrack={skipTrack}
                                    loadingMsg={loadingMsg}
                                    color={scoreColor}
            />)
                                    
            || <LyricsEnd score={currentScore} beathighscore={beatHighscore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default LyricsGuesserPresenter
