
import React, { useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router'
import TopBar from '../components/Games/TopBar';
import HigherLowerStart from '../components/Games/HigherLower/HigherLowerStart';
import HigherLowerGame from '../components/Games/HigherLower/HigherLowerGame';
import HigherLowerEnd from '../components/Games/HigherLower/HigherLowerEnd';
import { HigherLowerReducer, initialState } from '../reducers/HigherLowerReducer';
import { getTwoTracks } from '../helpers/HigherLower'
import AuthConsumer from '../contexts/auth';
import { getScore, updateScore } from '../models/User';


const HigherLowerPresenter = () => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState();
    const [state, dispatch] = useReducer(HigherLowerReducer, initialState);
    const {loading, track1, artist1, artist2, id1, id2, track2, started, buttonDisabled, 
        currentScore, lost, restartTime, startTime, startColor, newPoints, beatHighscore} = state;
    const { currentUser } = AuthConsumer();

    const higher = async ( id1, id2) => {
        if(!mounted) return;
        if(id2 < id1) {
            //rätt
            // console.log("rätt")
            const {track1, id1, track2, id2} = await getTwoTracks(null, null);
            let newPoints = currentScore+1;
            setTimeout(() => dispatch({type: 'correctAnswer', payload: {currentScore: newPoints, newPoints: newPoints,
                track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1, 
                track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2}}), 500);
        } else {
            // console.log("fel")
            lostGame();
            //setTimeout(() => dispatch({type: 'lostGame'}), 500)
            //lite databas fetching, uppdatera highscore om nödvändigt etc
        }
    } 

    const lower = async (id1, id2) => {

        if(!mounted) return;
        if(id2 > id1) {
            //rätt
            // console.log("rätt")
            const {track1, id1, track2, id2} = await getTwoTracks(null, null);
            let newPoints = currentScore+1;
            setTimeout(() => dispatch({type: 'correctAnswer', payload: { currentScore: newPoints, newPoints: newPoints,
                track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1,
                track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2}}),500);
        } else {
            // console.log("fel")
            lostGame();
            //setTimeout(() => dispatch({type: 'lostGame'}), 500)
            //lite databas fetching, uppdatera highscore om nödvändigt etc
        }
    } 

    //lost game
    const lostGame = async () => {
        let prevScore = await getScore(currentUser.uid, "HL");
        let beat = false;
        if(prevScore < currentScore){
            console.log(prevScore);
            console.log(currentScore);
            updateScore(currentUser.uid, currentScore, "HL");
            beat = true;
        } 
        dispatch({type: 'lostGame', payload: {beatHighscore: beat}});
    }

    //handlers for game start/end etc

    //Handler for restarting game
    const restartGame = async () => {
        const {track1, id1, track2, id2} = await getTwoTracks(null, null);
        // console.log("restart");
        // console.log("track 1: ", track1);   
        // console.log("track 2: ", track2);
        // console.log("track 2 name: ", track2.track.track_name);
        dispatch({type: 'restartGame', payload: {track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1, 
                                                 track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2,
                                                 newPoints: null}});
    }
    
    //Handler for starting game
    const startGame = async () => {
        const {track1, id1, track2, id2} = await getTwoTracks(null, null);
        // console.log("start");
         console.log("track 1: ", track1);
         console.log("track 2: ", track2);
        dispatch({type: 'startGame', payload: {track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1,
                                               track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2,
                                               newPoints: null}});
    }

    //timers
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
        // console.log("mors");
        return () => clearInterval(intervalId);
    }, [restartTime])

    //Clean up
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div>
            <TopBar title="Higher or Lower" navigate={navigate}/>
            {(!started && <HigherLowerStart color={startColor} startGame={() => dispatch({type: 'loadStart', payload: {startTime: 3}})} time={startTime} disabled={buttonDisabled}/>) 
            || (!lost && <HigherLowerGame 
                                    track1={track1}
                                    track2={track2}
                                    artist1={artist1}
                                    artist2={artist2}
                                    id1={id1}
                                    id2={id2}
                                    higher={higher}
                                    lower={lower}
                                    loading={loading}
                                    currentScore={currentScore}
                                    score={newPoints}/>)
                                    
            || <HigherLowerEnd disabled={buttonDisabled} score={currentScore} beathighscore={beatHighscore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default HigherLowerPresenter