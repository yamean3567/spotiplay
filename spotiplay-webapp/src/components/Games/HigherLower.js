import React from 'react'
import { useNavigate } from 'react-router'

const HigherLower = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                Higher or lower
            </div>
            <div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
            <div>
                <button onClick={() => props.getTracks('us', 10, 1)}>try displaying top 10 tracks on the US-charts currently</button>
            </div>
            <div>
                <button onClick={() => props.getArtists('us', 10, 1)}>try displaying top 10 artists on the US-charts currently</button>
            </div>
            <ul>
                {!props.tracksLoading && props.tracks.map(track => {
                    return <li key={track.track.track_id}>Track name: {track.track.track_name}, Rating: {track.track.track_rating}</li>
                })}
            </ul>
            <ul>
                {!props.artistsLoading && props.artists.map(artist => {
                    return <li key={artist.artist.artist_id}>Artist name: {artist.artist.artist_name}, Rating: {artist.artist.artist_rating}</li>
                })}

            </ul>
        </div>
    )
}

export default HigherLower
