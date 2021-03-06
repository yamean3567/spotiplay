
import React, { useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router'
import TopBar from '../components/Games/TopBar';
import HigherLowerStart from '../components/Games/HigherLower/HigherLowerStart';
import HigherLowerGame from '../components/Games/HigherLower/HigherLowerGame';
import HigherLowerEnd from '../components/Games/HigherLower/HigherLowerEnd';
import { HigherLowerReducer, initialState } from '../reducers/HigherLowerReducer';
import { getTracks, getTwoTracks } from '../helpers/HigherLower'
import AuthConsumer from '../contexts/auth';
import { getScore, updateScore } from '../models/User';


const HigherLowerPresenter = () => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState();
    const [state, dispatch] = useReducer(HigherLowerReducer, initialState);
    const [loading, setLoading] = useState(false);
    const {track1, artist1, artist2, id1, id2, track2, started, buttonDisabled, restartbuttonDisabled,
        currentScore, lost, restartTime, startTime, startColor, newPoints, beatHighscore, tracks} = state;
    const { currentUser } = AuthConsumer();

    const higher = async (id1h, id2h, tracksh) => {
        try{
            if(!mounted) return;
            if(id2h < id1h) {
                //rätt
                setLoading(true);
                const {track1, id1, track2, id2, tracks} = await getTwoTracks(id1h, tracksh);
                let newPoints = currentScore+1;
                
                setTimeout(() => {
                    dispatch({type: 'correctAnswer', payload: {currentScore: newPoints, newPoints: newPoints,
                    track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1, 
                    track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2,
                    tracks: tracks, loading:loading}})
                    setLoading(false);
                }, 500);
            } else {
                // fel
                lostGame();
            }
        } catch {
            //intentionally left blank
        }
    } 

    const lower = async (id1l, id2l, tracksl) => {
        try {
            if(!mounted) return;
            if(id2l > id1l) {
                //rätt
                setLoading(true);
                const {track1, id1, track2, id2, tracks} = await getTwoTracks(id2l, tracksl);
                let newPoints = currentScore+1;
            
                setTimeout(() => {
                    dispatch({type: 'correctAnswer', payload: { currentScore: newPoints, newPoints: newPoints,
                    track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1,
                    track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2,
                    tracks: tracks, loading:loading}})
                    setLoading(false);
                }, 500);
            } else {
                lostGame();
            }
        } catch {
            //intentionally left blank
        }
    } 

    //lost game
    const lostGame = async () => {
        try {
            let prevScore = await getScore(currentUser.uid, "HL");
            let beat = false;
            if(prevScore < currentScore){
                updateScore(currentUser.uid, currentScore, "HL");
                beat = true;
            } 
            dispatch({type: 'lostGame', payload: {beatHighscore: beat}});
        } catch {
            //intentionally left blank
        }
    }

    //Handler for restarting game
    const restartGame = async () => {
        setLoading(true);
        const {track1, id1, track2, id2} = await getTwoTracks(null, tracks);
        dispatch({type: 'restartGame', payload: {track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1, 
                                                 track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2,
                                                 newPoints: null, tracks:tracks, loading:loading}});
        setLoading(false);
    }
    
    //Handler for starting game
    const startGame = async () => {
        try {
            setLoading(true);
            const tracks = await getTracks();
            const {track1, id1, track2, id2} = await getTwoTracks(null, tracks);
            dispatch({type: 'startGame', payload: {track1:track1.track.track_name, artist1:track1.track.artist_name, id1:id1,
                                               track2:track2.track.track_name, artist2:track2.track.artist_name, id2:id2,
                                               newPoints: null, tracks:tracks, loading:loading}});
            setLoading(false);
        } catch {
            //intentionally left blank
        }
        
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
        //eslint-disable-next-line
    },[startTime])

    //Restart-game timer (count down for restarting game)
    useEffect(() => {
        if(restartTime === -1) return;
        if(restartTime === 0) restartGame();
        const intervalId = setInterval(() => {
            dispatch({type: 'loadRestart', payload: {restartTime: restartTime - 1}});
        }, 1000);
        return () => clearInterval(intervalId);
        //eslint-disable-next-line
    }, [restartTime])

    //Clean up
    useEffect(() => {
        setMounted(true);
        return () => {setMounted(false)};
    }, [])

    return (
        <div className="h-screen overflow-visible md:h-screen md:overflow-hidden">
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
                                    score={newPoints}
                                    tracks={tracks}/>)
                                    
            || <HigherLowerEnd disabled={restartbuttonDisabled} score={currentScore} beathighscore={beatHighscore} navigate={navigate} restartGame={() => dispatch({type: 'loadRestart', payload: {restartTime: 3}})} time={restartTime}/>}
        </div>
    )
}

export default HigherLowerPresenter