import React, { useState, useEffect } from 'react'

const LyricsEnd = (props) => {
    const messages = ["Nice try, your score for this round was: ", "WOW! You beat your highscore! Good job! New highscore is: "]
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        setDisabled(false);
        return () => setDisabled(true);
    }, [])
    return (
        <div className= "flex items-center flex-col bg-gradient-to-b from-black via-black to-green-900 text-gray-300 h-screen font-mono">
        <div className= "absolute bottom-2/4 flex flex-col items-center">
            <div className="md:mb-5 text-center">{props.beathighscore ? messages[1] : messages[0]}{props.score}</div>
                <div className="md:mb-5">
                    <button className="hover:text-yellow-500" disabled={disabled} onClick={() => {props.restartGame(); setDisabled(true);}}>{!disabled ? "RESTART" : "Restarting in " + props.time}</button>
                </div>
                <div className="md:mb-5">
                    <button className="hover:text-red-500" onClick={() => props.navigate("/home")}>Exit</button>
                </div>
           </div>
        </div>
    )
}

export default LyricsEnd
