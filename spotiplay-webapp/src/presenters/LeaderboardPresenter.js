import { useEffect, useState } from "react";
import { getTopRating } from "../models/User";
import { useNavigate } from "react-router";
import TopBar from "../components/Games/TopBar";
import DisplayLeaderboard from "../components/Games/Leaderboard/Leaderboard"

const LeaderboardPresenter = () =>{
    const [leaders, setLeaders] = useState([]);
    const navigate = useNavigate();

    const updateLeaders = async () => {
        let leaders = await getTopRating();
        let arr = [];
        leaders.forEach(function(doc) {
            arr.push({...doc.data()})
        });

        setLeaders(arr);
    }

    useEffect(() => {
        updateLeaders();
    }, []);

    return (
        <div>
            <TopBar title="Leaderboard" navigate={navigate}/>
            <DisplayLeaderboard leaders={leaders}/>
        </div>
    );
};

export default LeaderboardPresenter