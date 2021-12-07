import React from 'react'

const LyricsStart = (props) => {
    let background = props.disabled ? "" : " hover:bg-green-900"
    return (
        <div className="absolute left-1/2 bottom-2/3 transform -translate-x-1/2">
                <button className={props.color + background + " text-white font-bold py-4 px-10 rounded"} disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
        </div>
    )
}

export default LyricsStart
