import React from 'react'

const HigherLowerEnd = (props) => {
    return (
        <div>
           <div>You lost! Score: {props.score}</div>
           <div>
               <button disabled={props.disabled} onClick={() => props.restartGame()}>{!props.disabled ? "RESTART" : "Restarting in " + props.time}</button>
           </div>
           <div>
               <button onClick={() => props.navigate("/home")}>Exit</button>
           </div>
        </div>
    )
}

export default HigherLowerEnd