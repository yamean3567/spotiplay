import { useEffect, useState } from "react";
import { getTopHLScore, getTopLGScore } from "../models/User";
import { useNavigate } from "react-router";
import TopBar from "../components/Games/TopBar";
import DisplayLeaderboard from "../components/Games/Leaderboard/Leaderboard"

const LeaderboardPresenter = () =>{
    const [leadersLG, setLeadersLG] = useState([]);
    const [leadersHL, setLeadersHL] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const updateLeaders = async () => {
        setLoading(true);
        let LG = await getTopLGScore(10);
        let HL = await getTopHLScore(10);
        let arr1 = [];
        let arr2 = [];
        LG.forEach(function(doc) {
            arr1.push({...doc.data()})
        });
        HL.forEach(function(doc) {
            arr2.push({...doc.data()})
        });
        setLeadersLG(arr1);
        setLeadersHL(arr2);
        setLoading(false);
    }

    useEffect(() => {
        updateLeaders();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-t from-gray-900 to-black">
            <TopBar title="Leaderboard" navigate={navigate}/>
            {loading ? <div className="grid place-items-center h-screen"><img alt="gif" src="//www.csc.kth.se/~cristi/loading.gif"/></div>
            :
            <DisplayLeaderboard 
                leadersLG={leadersLG} 
                leadersHL={leadersHL}
                loading={loading}
            />
            }
        </div>
    );
};

export default LeaderboardPresenter