
import React, { useEffect, useState } from 'react'
import { MusicMatch } from '../apis/MusicMatch/musicMatch';
import TopBar from '../components/Games/TopBar';
import LyricsStart from '../components/Games/HigherLower/HigherLowerStart';
import HigherLower from '../components/Games/HigherLower/HigherLowerGame';
import LyricsEnd from '../components/Games/HigherLower/HigherLowerEnd';
import { getSentenceAndWord } from '../helpers/HigherLower'
const HigherLowerPresenter = () => {
    //temporary data
    const [tracks, setTracks] = useState([]);
    const [loadingTracks, setLoadingTracks] = useState(true);
    const [mounted, setMounted] = useState();
    const [artists, setArtists] = useState([]);
    const [loadingArtists, setLoadingArtists] = useState(true);
    //page 1 --> toplist
    const getTracks = async (country) => {
        if(!mounted) return;
        const data = await MusicMatch.getTopTracks(country, 10, 1);
        setTracks(data);   //array of artists
        setLoadingTracks(false);
    }

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
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
