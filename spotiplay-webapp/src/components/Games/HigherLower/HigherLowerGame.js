import React from 'react'


const HigherLower = (props) => {
    //                    <div className="grid place-items-center text-center p-2 flex-grow text-xl"> <div className='font-bold'>{props.track1} </div> by <div className='font-bold'>{props.artist1}</div></div> grid gap-y-2 place-items-center text-center p-2 text-xl bg-red-500"
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-gray-300 font-mono flex-col flex-row">
            <div className='flex flex-col h-full flex-grow md:flex-col flex-grow'>
                <div className=" mb-4 text-center mx-auto border-2 rounded-lg w-24 h-22 border-green-800 text-2xl py-2">
                    Score: {props.currentScore}
                </div>
                <div className="flex flex-col md:flex-col">

                    <div className="flex-1 text-center grid-cols-1 grid object-contain md:flex-1 md:text-center md:h-24 md:grid-cols-1 md:gap-y-1 md:mt-10"> <b>{props.track2}</b>by <b>{props.artist2}</b> is
                        <br/>
                        <div className="mb-4 text-center mx-auto py-2 flex flex-col gap-y-2">
                            <button className="p-3 border-2 rounded-lg w-24 h-22 border-green-800 hover:bg-green-600" onClick={() => props.higher(props.id1, props.id2, props.tracks)}> Higher </button>
                            <button className="p-3 border-2 rounded-lg w-24 h-22 border-gray-800 hover:bg-gray-600" onClick={() => props.lower(props.id1, props.id2, props.tracks)}> Lower </button>
                        </div>
                        <br/>
                        on the US chart than <b>{props.track1}</b> by <b>{props.artist1}</b>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HigherLower
