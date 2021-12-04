import React from 'react'

const HigherLowerStart = (props) => {
    return (
        <div>
            <header>
            <h1> HIGHER or LOWER</h1>
            </header>
            <button disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
        </div>
    )
}

export default HigherLowerStart