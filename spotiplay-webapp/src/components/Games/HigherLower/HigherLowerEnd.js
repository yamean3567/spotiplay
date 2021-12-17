import React, {useState, useEffect} from 'react'

const HigherLowerEnd = (props) => {
    const [disabled, setDisabled] = useState(true);
    const messages = ["Nice try, your score for this round was: ", "WOW! You beat your highscore! Good job! New highscore is: "]

    useEffect(() => {
        setDisabled(false);
        return () => setDisabled(true);
    }, [])

    return (
        <div className="flex flex-col bg-gradient-to-b from-black via-black to-green-900 text-gray-300 h-screen font-mono">
            <div className="md:mb-5 text-center">
                <div className="md:mb-5 p-2 text-sm font-bold text-2xl"> {props.beathighscore ? messages[1] : messages[0]}{props.score}</div>
            </div>
            <div className='flex flex-col items-center gap-y-2'>
                <div className="md:mb-5 text-center p-3 border-2 rounded-lg h-22 border-green-800 hover:bg-green-600">
                    <button className=" p-2 text-sm font-bold text-white" disabled={disabled} onClick={() => {props.restartGame(); setDisabled(true);}}>{!disabled ? "Restart" : "Restarting in..." + props.time}</button>
                </div>
                <div className=" md:mb-5 p-3 text-center border-2 rounded-lg h-22 border-gray-800 hover:bg-gray-600">
                    <button className="p-2 text-sm font-bold text-white" onClick={() => props.navigate("/home")}>Exit</button>
                </div>
            </div>
        </div>
    )
}

export default HigherLowerEnd