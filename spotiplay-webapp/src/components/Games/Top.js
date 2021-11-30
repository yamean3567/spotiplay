import React from 'react'
import { useNavigate } from 'react-router'

const Top = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <header>
            <h1> Guess the Top Songs!</h1>
            </header>
            <div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
            
            <div>
                <button onClick={() => props.getArtists('us', 10, 1)}>try displaying top 10 artists on the US-charts currently</button>
            </div>
            <ul>
                {!props.tracksLoading && props.tracks.map(track => {
                    return <li key={track.track.track_id}>Track name: {track.track.track_name}</li>
                })}
            </ul>
        </div>
    )
}

export default Top
