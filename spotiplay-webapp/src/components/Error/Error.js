import React from 'react'
import { useLocation } from 'react-router'

const Error = () => {
    const location = useLocation();
    return (
        <div>Woops, there is currently no page with path {location.pathname} on our servers!</div>
    )
}

export default Error
