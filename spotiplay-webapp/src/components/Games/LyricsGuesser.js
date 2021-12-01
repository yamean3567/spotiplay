import React, {useState} from 'react'
import { useNavigate } from 'react-router'

const LyricsGuesser = (props) => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    return (
        <div>
            <div>
                Guess the lyrics
            </div>
            <div>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
            <div>
                <button onClick={() => props.startGame()}>Random sentence test</button>
            </div>
            {props.flag ? <form onSubmit = {props.guessWord}>
                <label>
                    <input 
                        type = "text"
                        value = {text}
                        onChange={e => {setText(e.target.value); props.setGuessedWord(e.target.value)}}
                    />
                </label>
            </form> : <div>wrong guess, want to restart?<button onClick = {() => { setText(''); props.setFlag(true)}}> Restart </button></div>}
            <div>
                {!props.loading && <div>Sentence: {props.data.sentence} ~ Word: {props.data.word}</div>}
            </div>
        </div>
    )
}

export default LyricsGuesser
