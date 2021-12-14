import {  useNavigate } from 'react-router-dom';
const About = () => {   
    let navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen font-mono italic ">
            <button className="bg-green-900 rounded hover:bg-yellow-500 hover:text-black"onClick={() => navigate('/')}>Back to login</button>
            <div className="absolute text-left text-sm px-3 md:left-1/3 text-italic text-green-800">
                
                <div className="mt-20">
                Music lover? Then you've found the right place! <br/>
                Spotiplay consists of two games where you, as a music <br/>
                fanatic, get to practise and show of your true musical <br/>
                knowledge!
                </div>
                <br/><br/>
                This is a project made during the course DH2642<br/>
                The developers of this project are:<br/>
                > Mulle<br/>
                > Mallan brallan<br/>
                > Mayo<br/>
                > Yartier<br/>
            </div>
        </div>
    )
}

export default About
