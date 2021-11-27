import {  useNavigate } from 'react-router-dom';
const About = () => {   
    let navigate = useNavigate();

    return (
        <header>
            <h3>ABOUT PAGE</h3>
            <button onClick={() => navigate('/')}>Back to login</button>
        </header>
    )
}

export default About
