//forfarande WIP
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react'
const HigherLower = () => {
    let navigate = useNavigate();
    const [selected, select] = useState("");
    const [password, setPassword] = useState("")
   return( <div>
        <header>
            <h1> HIGHER or LOWER</h1>
        </header>
        <button onClick={() => navigate('/Start')}> HOME </button> 
        <div>
            <span>
        <img src={img1}> {alt1} </img> <button onClick={() => select(alt1), compare(alt1, alt2)}>Higher</button> 
        <img src={img2}> {alt2} </img> <button onClick={() => select(alt2), compare(alt1, alt2)}>Lower</button>
        </span>
        </div>                     

    </div>
    );
}
export default HigherLower //notes: inte helt säker på hem navigationen elr hur knapparna ska funka fortfarande WIP