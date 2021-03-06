import React from 'react'

const HigherLowerStart = (props) => {
    let background = props.disabled ? "" : " hover:bg-green-900"
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-gray-900 to-black'>
        <div className="grid place-items-center">
            <button className={props.color + background + " text-white font-bold py-4 px-10 rounded"} disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
        </div>
        <div className="text-gray-300 font-mono">
            <br/>
        Guess which song is higher or lower on the US top 50!</div>
        <img className="md:fixed md:bottom-0 md:h-1/3" alt="2pac" src="../pngaaa.com-16896.png"/>
    </div>)
}

export default HigherLowerStart