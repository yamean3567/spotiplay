import React , { useEffect, useState } from 'react'
import {FcAlarmClock} from 'react-icons/fc'

const LyricsGame = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!props.score) return;
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [props.score, props.data.sentence.hid])

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-gray-300 font-mono flex-col md:flex-row">
                <div className="flex-1 text-center text-sm md:text-base md:text-left p-2 md:pt-10">
                    <div className="font-bold">
                        Artist <br/>
                    </div>
                        {props.data.artist}
                    <div className="font-bold">
                        Track <br/>
                    </div>  
                        {props.data.track}
                </div>     
                <div className="flex-1 h-2/3 text-center text-sm md:text-base md:p-2 md:mt-10">
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
                    </form> : <div className="text-red-500 animate-bounce md:mt-5 md:mb-5">{props.loadingMsg}</div>}
                    ~ Word: {props.data.word}
                    <button className="hover:text-yellow-500" disabled={props.formDisabled} onClick={props.skipTrack}>Skip track</button>
                    </div>
                </div>
                <div className="flex-1 text-center gap-y-2 grid-cols-3 grid md:h-24 md:grid-cols-1 md:gap-y-1 md:mt-10">
                   
                    <div className="mb-4 grid justify-items-center mx-auto border-2 rounded-lg border-green-800 w-24 h-16 md:h-24 text-sm md:text-2xl py-2 md:w-36">
                            {props.gameTime >= 0 ? props.gameTime : 0}s <br/>
                            <FcAlarmClock size={24} />
                    </div>
                    <div className="mb-4 text-center mx-auto border-2 rounded-lg w-24 h-16 md:h-24 border-green-800 text-sm py-2 md:text-2xl md:w-36">
                    {props.currentScore} <br/>
                            pts
                    </div>
                    {loading &&
                        <div className = {props.color}>
                            {props.score}
                        </div>}
                </div>
        </div>
    )
}

export default LyricsGame
