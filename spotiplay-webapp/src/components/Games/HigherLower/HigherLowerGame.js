import React from 'react'


const HigherLower = (props) => {

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-gray-300 font-mono flex-col flex-row">
            <div className=' flex flex-col flex-grow flex-grow'>
                <div className='bg-red-500'>
                    Score: {props.currentScore}
                </div>

                <div className="bg-yellow-500 flex flex-row">

                    <div className=" bg-blue-500 text-center p-2 text-sm font-bold text-white flex-grow"> {props.track1}  by {props.artist1}</div>

                    <div className="bg-purple-500 text-center p-2 text-sm font-bold text-white inset-y-2 right-2 flex-grow"> {props.track2} by {props.artist2} is
                        <div><button className="p-3 bg-green-600 rounded-lg m-3 p-2 text-sm font-bold text-white hover:bg-green-900" onClick={() => props.higher(props.id1, props.id2)}> Higher </button></div>
                        <div><button className="p-3 bg-gray-600 rounded-lg m-3 p-2 text-sm font-bold text-white hover:bg-gray-900" onClick={() => props.lower(props.id1, props.id2)}> Lower </button></div>
                        on the US chart than {props.track1}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HigherLower
