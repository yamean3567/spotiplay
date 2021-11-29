import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { getRating } from '../models/User';
const HigherLowerPresenter = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [name1, getsong]= useState();
    const [name2, getsong]= useState();
    return (
        <div>
            <HigherLower alt1={name1} alt2={name2} error={error} loading={loading}/>
        </div>
    )
}

export default HigherLowerPresenter