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
    const[timer, setTimer] = useState(null);
    const [state, dispatch] = useReducer(lyricsGameReducer, initialState);
    const {loading,  sentence, word, guessedWord, started, buttonDisabled, formDisabled, currentScore, lost} = state;
    const [mounted, setMounted] = useState();
   
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
        dispatch({type: 'disableButton'});
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'restartGame', payload: {sentence: sentence, word: word}});
    }
    
    //Handler for starting game
    const startGame = async () => {
        dispatch({type: 'disableButton'});
        const {sentence, word} = await getSentenceAndWord();
        dispatch({type: 'startGame', payload: {sentence: sentence, word: word.toLowerCase()}});
    }

    //Timer (count down for starting game)
    useEffect(() => {
        if(timer === -1) return;
        if(timer === 0) startGame(); 
        const interval = setInterval(() => {
            setTimer(timer-1);
        }, 1000);
        return () => clearInterval(interval);
    },[setTimer, timer])

    //Clean up
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div>
            <TopBar title="Guess the Lyrics" navigate={navigate}/>
            {(!started && <LyricsStart startGame={() => {setTimer(5);dispatch({type: 'disableButton'})}} time={timer} disabled={buttonDisabled}/>) 
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
