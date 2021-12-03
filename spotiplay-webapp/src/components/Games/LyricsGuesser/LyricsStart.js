import React from 'react'

const LyricsStart = (props) => {
    return (
        <div>
            <div>
                About the game
            </div>
            <button disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
        </div>
    )
}

export default LyricsStart