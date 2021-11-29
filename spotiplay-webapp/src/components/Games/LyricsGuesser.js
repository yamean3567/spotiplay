import React from 'react'
import { useNavigate } from 'react-router'

const LyricsGuesser = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                Guess the lyrics
            </div>
            <div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    )
}

export default LyricsGuesser
