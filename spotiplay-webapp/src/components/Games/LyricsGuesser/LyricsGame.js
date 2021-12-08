import React from 'react'

const LyricsGame = (props) => {
    return (
        <div className="bg-gradient-to-b from-black via-black to-green-900 text-gray-300 h-screen font-mono">
            <div>
                {!props.loading && 
                <div>
                    Album: {props.data.album}<br/>
                    Song: {props.data.track}<br/>
                    Artist: {props.data.artist}<br/>
                    Sentence: 
                    {props.data.sentence.helpsentence}<br/>
                    {props.data.sentence.hid} 
                    ~ Word: {props.data.word}
                </div>}
            </div> 
                {!props.formDisabled ? <form onSubmit = {!props.formDisabled ? props.guessWord : e => e.preventDefault()}>
                            <label>
                                <input
                                    className="text-gray-800"
                                    autoFocus 
                                    type = "text"
                                    value = {props.text}
                                    onChange={!props.formDisabled ? e => props.setGuessedWord(e.target.value): ''}
                                />
                            </label>
                </form> : <div>Guessing..</div>}
            <div>
                {props.currentScore}
            </div>
            <div>
                {props.gameTime}
            </div>
        </div>
    )
}

export default LyricsGame
