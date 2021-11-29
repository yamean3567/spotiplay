import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { getRating } from '../models/User';
const HigherLowerPresenter = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [selected, select] = useState("");
    const [song, getSong] = useState("");
    return (
        <div>
            <HigherLower getSong error={error} loading={loading}/>
        </div>
    )
}

export default HigherLowerPresenter