import React from 'react'

const LyricsEnd = (props) => {
    return (
        <div>
           <div>You lost! Score: {props.score}</div>
           <div>
               <button disabled={props.disabled} onClick={() => props.restartGame()}>Restart game</button>
           </div>
           <div>
               <button onClick={() => props.navigate(-1)}>Exit</button>
           </div>
        </div>
    )
}

export default LyricsEnd
