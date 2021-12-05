import { MusicMatch } from "../apis/MusicMatch/musicMatch";
//Given a number k, returns a pseudorandom number in 0..k-1
const getRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}

export const getTwoTracks = async (track1, id1) => {
    let tracks = await MusicMatch.getTopTracks('us', 10, 1);
    let rand2=getRandomNumber(10);
    let track2=tracks[rand2];

    if(track1!=null){    
    return {track1:track1, id1:id1, track2:track2, id2:rand2}
    
    }
    else{
        if(rand2%2===0){
        let track1=tracks[rand2+1];
        return {track1:track1, id1:rand2+1, track2:track2, id2:rand2}
        }
        else {
            let track1=tracks[rand2-1];
        return {track1:track1, id1:rand2-1, track2:track2, id2:rand2}
        }

    }
}