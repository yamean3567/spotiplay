import React from 'react'

const LyricsStart = (props) => {
    let background = props.disabled ? "" : " hover:bg-green-900"

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-gray-900 to-black text-xs md:text-base">
            <div className="grid place-items-center">
                    <button className={props.color + background + " font-mono text-white font-bold py-4 px-10 rounded"} disabled={props.disabled} onClick={() => props.startGame()}>{!props.disabled ? "START" : "Starting in " + props.time}</button>
                <span className="decoration-clone shadow p-2 rounded text-gray-300 block"> 
                <div className="text-center font-mono">Are you up for a game of lyrics guesser?<br/>
                Lyrics from US and UK billboard top 100 <br/> Smash your record and guess the missing word as soon as possible!</div> <br/>
                <div className="flex flex-col-2">
                <img className="flex-1  h-1/4 w-1/4" alt="" src="https://officialpsds.com/imageview/r8/9n/r89n6j_large.png?1521316460"></img>
                <div className="flex-2 text-center h-1/2 w-1/2 font-mono">
                    <div className="font-bold font-mono text-2xl">RULES <br/></div>
                    <div className="text-left p-2 font-mono shadow border-2 border-green-800 rounded">
                        > Start with 10 seconds<br/>
                        > Wrong answer -3 seconds<br/>
                        > Right answer +5 seconds<br/>
                        > Faster answer = More points
                         
                    </div>
                </div>
                </div>
                </span>
            </div>
        </div>
    )
}


export default LyricsStart
