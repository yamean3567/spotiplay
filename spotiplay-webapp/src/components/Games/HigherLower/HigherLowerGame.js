import React from 'react'
import { useNavigate } from 'react-router'

const HigherLower = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <header>
            <h1> HIGHER or LOWER</h1>
            </header>
            <div>
                <button onClick={() => navigate("/home")}>Go back</button>
            </div>
            <div>
                <button onClick={() => props.getTracks('us', 10, 1)}>guess the top 10 tracks on the US-charts currently!</button>
            </div>
            <ul>
                {!props.tracksLoading && props.tracks.map(track => {
                    return <li key={track.track.track_id}>Track name: {track.track.track_name}, Rating: {track.track.track_rating}</li>
                })}
            </ul>
        </div>
    )
}

export default HigherLower
