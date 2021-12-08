import React from 'react'

const HigherLowerEnd = (props) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-1/3 bg-white shadow-md px-8 pt-6 pb-16 text-center">
           <div className="items-center center-text p-2 text-sm font-bold text-gray-700">You lost! Score: {props.score}</div>

           <div className="p-1 bg-green-600 rounded-lg m-3 text-center">
               <button className="items-center center-text p-2 text-sm font-bold text-white" disabled={props.disabled} onClick={() => props.restartGame()}>{!props.disabled ? "Restart" : "Restarting in " + props.time}</button>
           </div>
           <div className="p-1 bg-gray-600 rounded-lg m-3 text-center">
               <button className="items-center center-text p-2 text-sm font-bold text-white" onClick={() => props.navigate("/home")}>Exit</button>
           </div>
           </div>
        </div>
    )
}

export default HigherLowerEnd