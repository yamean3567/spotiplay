import React from 'react'


const HigherLower = (props) => {

    return (
        <div>
            <div>{props.track1}</div>
            <div> {props.track2} is
            <button onClick={(e)=>props.higher(e.target.value)}>Higher</button>
            <button onClick={(e)=>props.lower(e.target.value)}>Lower</button>
            on the US chart than {props.track1}
            </div>
            
        </div>
    )
}

export default HigherLower
