import React from 'react'

const TopBar = (props) => {
    return (
        <div className = "font-mono bg-black text-gray-300">
            <div>{props.title}</div>
            <div>
                <button className="hover:text-red-500" onClick={() => props.navigate("/home")}>Back</button>
            </div>

        </div>
    )
}

export default TopBar
