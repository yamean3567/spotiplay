import React from 'react'
import { useNavigate } from 'react-router'

const LyricsGuesser = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                Guess the lyrics
            </div>
            <div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
            <div>
                <button onClick={() => props.getLyrics('us', 1, 1)}>Get the top US songs' lyrics</button>
            </div>
            <div>
                {!props.loading && <div>{props.lyrics.lyrics_body}</div>}
            </div>
        </div>
    )
}

export default LyricsGuesser
