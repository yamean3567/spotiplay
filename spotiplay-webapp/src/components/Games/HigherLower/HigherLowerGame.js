import React from 'react'


const HigherLower = (props) => {

    return (
        <div>
            <div> {props.track1}</div>
            <br/>
            <div> {props.track2} is
            <br/>
            <div><button onClick={()=> props.higher(props.id1, props.id2)}> Higher </button></div>
            <br/>
            <div><button onClick={()=>props.lower(props.id1, props.id2)}> Lower </button></div>
           on the US chart than {props.track1}
            </div>

            <div>
                {props.currentScore}
            </div>
            <div>
                {props.gameTime}
            </div>
            
        </div>
    )
}

export default HigherLower
