import { useEffect, useState } from "react";
import { getTopRating } from "../models/User";

const LeaderboardPresenter = () =>{
    const [leaders, setLeaders] = useState({});

    const updateLeaders = async () => {
        let leaders = await getTopRating();
        let arr = [];
        let i = 1;
        leaders.forEach(function(doc) {
            //console.log(i);
            //console.log(doc.data());
            arr.push({...doc.data(), placement: i})
            i++;
        });


        //leaders = leaders.map((profile, index) => ({...profile.data(), placement: index + 1}));
        console.log(arr);
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