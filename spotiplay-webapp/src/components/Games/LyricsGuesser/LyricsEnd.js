import React from 'react'

const LyricsEnd = (props) => {
    return (
        <div className= "flex items-center flex-col bg-gradient-to-b from-black via-black to-green-900 text-gray-300 h-screen font-mono">
        <div className= "absolute bottom-3/4 flex flex-col items-center">
            <div>You lost! Score: {props.score}</div>
                <div>
                    <button disabled={props.disabled} onClick={() => props.restartGame()}>{!props.disabled ? "RESTART" : "Restarting in " + props.time}</button>
                </div>
                <div>
                    <button onClick={() => props.navigate("/home")}>Exit</button>
                </div>
           </div>
        </div>
    )
}

export default LyricsEnd
