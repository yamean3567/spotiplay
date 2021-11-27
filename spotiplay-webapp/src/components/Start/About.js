import {  useNavigate } from 'react-router-dom';
const About = () => {   
    let navigate = useNavigate();

    return (
        <div>
        <header>
            <h1>ABOUT</h1>
        </header>
        <h5>
            Music lover? Then you've found the right game!
            Spotiplay is lalala...
        </h5>
        <button onClick={() => navigate('/')}>Back to login</button>
        </div>
    )
}

export default About
