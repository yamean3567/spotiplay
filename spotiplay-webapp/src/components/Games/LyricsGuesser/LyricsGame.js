import React , { useEffect, useState } from 'react'
import {FcAlarmClock} from 'react-icons/fc'

const LyricsGame = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!props.score) return;
        setLoading(true)
        setTimeout(() => setLoading(false), 800);
    }, [props.score])

    return (
        <div className="flex min-h-screen overflow-hidden bg-gradient-to-b from-black via-black to-green-900 text-gray-300 font-mono md:flex-row">
                <div className="flex-1 text-center md:text-left p-2">
                    <div className="font-bold">
                        Artist <br/>
                    </div>
                        {props.data.artist}
                    <div className="font-bold">
                        Track <br/>
                    </div>  
                        {props.data.track}
                </div>     
                <div className="flex-1 h-2/3 text-center p-2">
                    <div className="font-bold">
                        {props.data.track}<br/>
                        </div>
                            {props.data.sentence.helpsentence}<br/>
                            {props.data.sentence.hid}
                    <div>
                    {!props.formDisabled ? <form onSubmit = {!props.formDisabled ? props.guessWord : e => e.preventDefault()}>
                                <label>
                                    <input
                                        className="text-gray-800"
                                        autoFocus 
                                        type = "text"
                                        value = {props.text}
                                        onChange={!props.formDisabled ? e => props.setGuessedWord(e.target.value): ''}
                                    />
                                </label>
                    </form> : <div className="animate-bounce">Guessing..</div>}
                    ~ Word: {props.data.word}
                    </div>
                </div>
                <div className="flex-1 text-center gap-y-2">
                   
                    <div className="mb-4 container grid justify-items-center mx-auto border-2 w-36 text-2xl py-2">
                            {props.gameTime} <br/>
                            <FcAlarmClock size={36} />
                    </div>
                    <div className="mb-4 text-center container mx-auto border-2 w-36 text-2xl py-2">
                    {props.currentScore}
                        
                    </div>
                    {loading && 
                        <div className="animate-pulse text-center container mx-auto border-2 w-36 text-2xl py-2">
                            +{props.score}
                        </div>}
                </div>
        </div>
    )
}

export default LyricsGame
