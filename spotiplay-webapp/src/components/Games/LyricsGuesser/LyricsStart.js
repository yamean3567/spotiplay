import React from 'react'

const LyricsStart = (props) => {
    let background = props.disabled ? "" : " hover:bg-green-900"
    //let width = screen.width()
    //console.log(width);
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-gray-900 to-black">
            <div className="grid place-items-center">
                    <button className={props.color + background + " font-mono text-white font-bold py-4 px-10 rounded"} disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
                <span className="decoration-clone shadow p-2 rounded text-gray-300 block"> 
                <div className="text-center font-mono">Are you for a game of lyrics guesser?<br/>
                Lyrics from US and UK billboard top 100 <br/> Smash your record and guess the missing word as soon as possible!</div> <br/>
                <img alt="" src="https://officialpsds.com/imageview/r8/9n/r89n6j_large.png?1521316460"></img>
                </span>
            </div>
        </div>
    )
}


export default LyricsStart
