import { useEffect, useState } from "react";
import { getTopRating } from "../models/User";

const LeaderboardPresenter = () =>{
    const [leaders, setLeaders] = useState({});

    const updateLeaders = async () => {
        let leaders = await getTopRating();
        console.log(leaders);
        console.log("hej");
    }

    useEffect(() => {
        updateLeaders();
    }, []);

    return(
        <div>
            hej
        </div>
    );
};

export default LeaderboardPresenter