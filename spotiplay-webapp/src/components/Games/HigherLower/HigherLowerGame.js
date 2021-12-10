import React from 'react'


const HigherLower = (props) => {

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-gray-300 font-mono flex-col flex-row">
            <div className='flex flex-col h-full flex-grow'>
                <div className="mb-4 text-center mx-auto border-2 rounded-lg w-24 h-22 border-green-800 text-2xl py-2 md:w-36">
                    Score: {props.currentScore}
                </div>

                <div className="flex flex-row">

                    <div className="grid place-items-center text-center p-2 flex-grow text-xl"> <div className='font-bold'>{props.track1} </div> by <div className='font-bold'>{props.artist1}</div></div>

                    <div className="grid gap-y-2 place-items-center text-center p-2 inset-y-2 right-2 flex-grow text-xl "> <nobr><b>{props.track2}</b> by <b>{props.artist2}</b> is</nobr> 
                        <div><button className="p-3 border-2 rounded-lg w-24 h-22 border-green-800 hover:bg-green-600" onClick={() => props.higher(props.id1, props.id2)}> Higher </button></div>
                        <div><button className="p-3 border-2 rounded-lg w-24 h-22 border-gray-800 hover:bg-gray-600" onClick={() => props.lower(props.id1, props.id2)}> Lower </button></div>
                        <nobr>on the US chart than <b>{props.track1}</b></nobr>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HigherLower
