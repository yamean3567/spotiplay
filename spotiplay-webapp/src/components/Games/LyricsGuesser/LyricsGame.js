import React from 'react'


const LyricsGame = (props) => {
    return (
        <div>
            <div>
                {!props.loading && <div>Sentence: {props.data.sentence} ~ Word: {props.data.word}</div>}
            </div> 
             <form onSubmit = {props.guessWord}>
                        <label>
                            <input 
                                type = "text"
                                value = {props.text}
                                onChange={e => props.setGuessedWord(e.target.value)}
                            />
                        </label>
            </form> 
            <div>
                {props.currentScore}
            </div>
        </div>
    )
}

export default LyricsGame
