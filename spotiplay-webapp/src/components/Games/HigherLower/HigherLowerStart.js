import React from 'react'

const HigherLowerStart = (props) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-1/3 bg-white shadow-md px-8 pt-6 pb-16 items-center">

            <button disabled={props.disabled} className="items-center center-text p-2 text-sm font-bold text-gray-700 hover:text-green-700" onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
        </div>
        </div>
    )
}

export default HigherLowerStart