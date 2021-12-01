import React from 'react'


const LyricsGame = (props) => {
    return (
        <div>
            <div>
                {!props.loading && <div>Sentence: {props.data.sentence} ~ Word: {props.data.word}</div>}
            </div> 
                {!props.formDisabled ? <form onSubmit = {!props.formDisabled ? props.guessWord : e => e.preventDefault()}>
                            <label>
                                <input autoFocus 
                                    type = "text"
                                    value = {props.text}
                                    onChange={!props.formDisabled ? e => props.setGuessedWord(e.target.value): ''}
                                />
                            </label>
                </form> : <div>Guessing..</div>}
            <div>
                {props.currentScore}
            </div>
        </div>
    )
}

export default LyricsGame
