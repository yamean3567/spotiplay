import React from 'react'

const LyricsStart = (props) => {
    let background = props.disabled ? "" : " hover:bg-green-900"
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-t from-gray-900 to-black">
            <div className="absolute left-1/2 bottom-3/4 transform -translate-x-1/2">
                <button className={props.color + background + " font-mono text-white font-bold py-4 px-10 rounded"} disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
            </div>
            
            <span className="decoration-clone shadow p-2 rounded text-gray-300"> 
            <div className="text-center font-mono">Are you for a game of lyrics guesser?<br/>
            Lyrics from US and UK billboard top 100 <br/> Smash your record and guess the missing word as soon as possible!</div> <br/>
            <img src="https://officialpsds.com/imageview/r8/9n/r89n6j_large.png?1521316460"></img>
            </span>
        </div>

    )
}


export default LyricsStart
