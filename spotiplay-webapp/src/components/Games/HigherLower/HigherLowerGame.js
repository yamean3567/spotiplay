import React from 'react'


const HigherLower = (props) => {

    return (
        <div>
            <div>
                <div className="inset-top center-text p-2 text-sm font-bold text-gray-700 inline-flex inset-right" >
                    Score: {props.currentScore}
                </div>
                <div className="inset-top center-text p-2 text-sm font-bold text-gray-700 inline-flex inset-right" >
                    Time: {props.gameTime}
                </div>
            </div>

            <div className="h-screen flex flex-row inline-flex flex-grow row-span-full">

                <div className="items-left row-span-1 center-text p-2 text-sm font-bold text-gray-700 inline-flex inset-y-4 left-4 flex-grow"> {props.track1} </div>

                <div className="row-span-1 items-right center-text p-2 text-sm font-bold text-gray-700 inset-y-2 right-2 flex-grow"> {props.track2} is
                    <br />
                    <div><button className="items-right p-1 bg-green-600 rounded-lg m-3 text-center items-center center-text p-2 text-sm font-bold text-white" onClick={() => props.higher(props.id1, props.id2)}> Higher </button></div>
                    <div><button className="items-right p-1 bg-gray-600 rounded-lg m-3 text-center items-center center-text p-2 text-sm font-bold text-white" onClick={() => props.lower(props.id1, props.id2)}> Lower </button></div>
                    on the US chart than {props.track1}
                </div>

            </div>

        </div>
    )
}

export default HigherLower
