//forfarande WIP
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react'
const HigherLower = (props) => {
    let navigate = useNavigate();
 
   return( <div>
        <header>
            <h1> HIGHER or LOWER</h1>
        </header>
        <button onClick={() => navigate('/Start')}> HOME </button> 
        <div>
            <span>
        <img src={img1}> {alt1} </img> 
        <img src={img2}> {alt2} 
            <button onClick={() => select(alt1), compare(alt1, alt2)} value="Higher"></button> 
            <button onClick={() => select(alt2), compare(alt1, alt2)} value="Lower"></button>
        </img> 
        </span>
        </div>                     

    </div>
    );
}
export default HigherLower //notes: inte helt säker på hem navigationen elr hur knapparna ska funka fortfarande WIP