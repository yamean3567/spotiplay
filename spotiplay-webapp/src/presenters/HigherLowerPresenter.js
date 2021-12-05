
import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import TopBar from '../components/Games/TopBar';
import LyricsStart from '../components/Games/HigherLower/HigherLowerStart';
import HigherLower from '../components/Games/HigherLower/HigherLowerGame';
import LyricsEnd from '../components/Games/HigherLower/HigherLowerEnd';
import { getTwoTracks } from '../helpers/HigherLower'
const HigherLowerPresenter = () => {
    //temporary data
    const [tracks, setTracks] = useState([]);
    const [loadingTracks, setLoadingTracks] = useState(true);
    const [mounted, setMounted] = useState();
    const [artists, setArtists] = useState([]);
    const [loadingArtists, setLoadingArtists] = useState(true);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, [])

    //handlers for game start/end etc

    //Handler for restarting game
    const restartGame = async () => {
        const {track1, id1, track2, id2} = await getTwoTracks(country, null, null);
        dispatch({type: 'restartGame', payload: {track1:track1, id1:id1, track2:track2, id2:id2, gameTime: 10}});
    }
    
    //Handler for starting game
    const startGame = async () => {
        const {track1, id1, track2, id2} = await getTwoTracks(country, null, null);
        dispatch({type: 'startGame', payload: {track1:track1, id1:id1, track2:track2, id2:id2, gameTime: 10}});
    }

    const endGame = () => {
        
    }

//timers

    //Start-game timer (count down for starting game)
    useEffect(() => {
        if(startTime === -1) return;
        if(startTime === 0) startGame(); 
        const intervalId = setInterval(() => {
            dispatch({type: 'loadStart', payload: {startTime: startTime - 1}});
        }, 1000);
        console.log("tjena");
        return () => clearInterval(intervalId);
    },[startTime])

    //Restart-game timer (count down for restarting game)
    useEffect(() => {
        if(restartTime === -1) return;
        if(restartTime === 0) restartGame();
        const intervalId = setInterval(() => {
            dispatch({type: 'loadRestart', payload: {restartTime: restartTime - 1}});
        }, 1000);
        console.log("mors");
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
            <TopBar title="Higher or Lower" navigate={navigate}/>
            {(!started && <HigherLowerStart startGame={() => dispatch({type: 'loadStart', payload: {startTime: 3}})} time={startTime} disabled={buttonDisabled}/>) 
            || (!lost && <HigherLowerGame text={state.guessedWord} 
                                    setGuessedWord={w => dispatch({type: 'setGuessedWord', payload: {guessedWord: w}})} 
                                    guessWord={guessWord} data={{word: word, sentence: sentence}} 
                                    loading={loading}
                                    currentScore={currentScore}
                                    gameTime={gameTime}
                                    formDisabled={formDisabled}/>)
                                    
            || <HigherLowerEnd disabled={buttonDisabled} score={currentScore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default HigherLowerPresenter
