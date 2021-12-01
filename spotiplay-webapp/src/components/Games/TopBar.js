import React from 'react'

const TopBar = (props) => {
    return (
        <div>
            <div>{props.title}</div>
            <div>
                <button onClick={() => props.navigate("/home")}>Back</button>
            </div>

        </div>
    )
}

export default TopBar
