import React from 'react'


const HigherLower = (props) => {

    return (
        <div>
            <div> track1 {props.track1}</div>
            <br/>
            <div> track2 {props.track2} is
            <br/>
            <div><button onClick={(e)=>props.higher(props.id1, props.id2)}> Higher </button></div>
            <br/>
            <div><button onClick={(e)=>props.lower(props.id1, props.id2)}> Lower </button></div>
            on the US chart than {props.track1.track_name}
            </div>
            
        </div>
    )
}

export default HigherLower
