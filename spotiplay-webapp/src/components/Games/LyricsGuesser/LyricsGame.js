import React , { useEffect, useState } from 'react'
import {FcAlarmClock} from 'react-icons/fc'

const LyricsGame = (props) => {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(true);
    useEffect(() => {
        if(!mounted) return;
        if(!props.score) return;
        setLoading(true)
        setTimeout(() => setLoading(false), 800);
        return () => setMounted(false);
    }, [props.score, mounted])

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-gray-300 font-mono flex-col md:flex-row">
                <div className="flex-1 text-center md:text-left p-2 md:pt-10">
                    <div className="font-bold">
                        Artist <br/>
                    </div>
                        {props.data.artist}
                    <div className="font-bold">
                        Track <br/>
                    </div>  
                        {props.data.track}
                </div>     
                <div className="flex-1 h-2/3 text-center p-2 md:mt-10">
                    <div className="font-bold">
                        {props.data.track}<br/>
                        </div>
                            {props.data.sentence.helpsentence}<br/>
                            {props.data.sentence.hid}
                    <div>
                    {!props.formDisabled ? <form onSubmit = {!props.formDisabled ? props.guessWord : e => e.preventDefault()}>
                                <label>
                                    <input
                                        className="text-gray-800 md:mt-10"
                                        autoFocus 
                                        type = "text"
                                        value = {props.text}
                                        onChange={!props.formDisabled ? e => props.setGuessedWord(e.target.value): ''}
                                    />
                                </label>
                    </form> : <div className="text-red-500 animate-bounce md:mt-5 md:mb-5">Guessing..</div>}
                    ~ Word: {props.data.word}
                    </div>
                </div>
                <div className="flex-1 text-center gap-y-2 grid-cols-3 grid md:h-24 md:grid-cols-1 md:gap-y-1 md:mt-10">
                   
                    <div className="mb-4 grid justify-items-center mx-auto border-2 rounded-lg border-green-800 w-24 h-22 text-2xl py-2 md:w-36">
                            {props.gameTime} <br/>
                            <FcAlarmClock size={36} />
                    </div>
                    <div className="mb-4 text-center mx-auto border-2 rounded-lg w-24 h-22 border-green-800 text-2xl py-2 md:w-36">
                    {props.currentScore} <br/>
                            pts
                    </div>
                    {loading && 
                        <div className="mb-4 decoration-clone mx-auto bg-gradient-to-b from-green-900 via-green-800 to-green-400 animate-pulse text-center border-2 rounded-lg border-black w-24 h-22 text-2xl py-2 md:w-36">
                            +{props.score}
                        </div>}
                </div>
        </div>
    )
}

export default LyricsGame
