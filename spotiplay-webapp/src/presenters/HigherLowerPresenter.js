
import React, { useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router'
import TopBar from '../components/Games/TopBar';
import HigherLowerStart from '../components/Games/HigherLower/HigherLowerStart';
import HigherLowerGame from '../components/Games/HigherLower/HigherLowerGame';
import HigherLowerEnd from '../components/Games/HigherLower/HigherLowerEnd';
import { HigherLowerReducer, initialState } from '../reducers/HigherLowerReducer';
import { getTwoTracks } from '../helpers/HigherLower'
const HigherLowerPresenter = () => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState();
    const [state, dispatch] = useReducer(HigherLowerReducer, initialState);
    const {loading, track1, id1, id2, track2, started, buttonDisabled, 
        formDisabled, currentScore, lost, restartTime, startTime, gameTime} = state;


    const higher = async ( id1, id2) => {
        console.log("higher");
        console.log("id1: ", id1);
        console.log("id2: ", id2);
        if(!mounted) return;
        if(id2 < id1) {
            //rätt svar
            //console.log("word:", word);
            //console.log("guessedword:", guessedWord);
            const {track1, id1, track2, id2} = await getTwoTracks(null, null);
            console.log("track1: ", track1);
            setTimeout(() => dispatch({type: 'correctAnswer', payload: {gameTime: gameTime + 5, currentScore: currentScore+1, track1:track1.track.track_name, id1:id1, track2:track2.track.track_name, id2:id2}}),500);
        } else {
            setTimeout(() => dispatch({type: 'wrongAnswer', payload: {gameTime: gameTime-3}}), 500)
            //lite databas fetching, uppdatera highscore om nödvändigt etc
        }
    } 

    const lower = async (id1, id2) => {
        console.log("lower");
        console.log("id1: ", id1);
        console.log("id2: ", id2);
        if(!mounted) return;
        if(id2 > id1) {
            //rätt svar
            console.log("track1: ", track1);
            //console.log("word:", word);
            //console.log("guessedword:", guessedWord);
            const {track1, id1, track2, id2} = await getTwoTracks(null, null);
            console.log(track1, id1, track2, id2);
            setTimeout(() => dispatch({type: 'correctAnswer', payload: {gameTime: gameTime + 5, currentScore: currentScore+1, track1:track1.track.track_name, id1:id1, track2:track2.track.track_name, id2:id2}}),500);
        } else {
            setTimeout(() => dispatch({type: 'wrongAnswer', payload: {gameTime: gameTime-3}}), 500)
            //lite databas fetching, uppdatera highscore om nödvändigt etc
        }
    } 

    //handlers for game start/end etc

    //Handler for restarting game
    const restartGame = async () => {
        const {track1, id1, track2, id2} = await getTwoTracks(null, null);
        console.log("restart");
        console.log("track 1: ", track1);
        console.log("track 2: ", track2);
        console.log("track 2 name: ", track2.track.track_name);
        dispatch({type: 'restartGame', payload: {track1:track1.track.track_name, id1:id1, track2:track2.track.track_name, id2:id2, gameTime: 15}});
    }
    
    //Handler for starting game
    const startGame = async () => {
        const {track1, id1, track2, id2} = await getTwoTracks(null, null);
        console.log("start");
        console.log("track 1: ", track1);
        console.log("track 2: ", track2);
        dispatch({type: 'startGame', payload: {track1:track1.track.track_name, id1:id1, track2:track2.track.track_name, id2:id2, gameTime: 15}});
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
            || (!lost && <HigherLowerGame 
                                     track1={track1}
                                     track2={track2}
                                    id1={id1}
                                    id2={id2}
                                    higher={higher}
                                    lower={lower}
                                    loading={loading}
                                    currentScore={currentScore}
                                    gameTime={gameTime}
                                    formDisabled={formDisabled}/>)
                                    
            || <HigherLowerEnd disabled={buttonDisabled} score={currentScore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default HigherLowerPresenter
