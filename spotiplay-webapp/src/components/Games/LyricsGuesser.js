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
                <button onClick={() => props.getSentence()}>Random sentence test</button>
            </div>
            <div>
                {!props.loading && <div>Sentence: {props.data.sentence} ~ Word: {props.data.word}</div>}
            </div>
        </div>
    )
}

export default LyricsGuesser
