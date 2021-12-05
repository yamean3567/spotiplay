import { MusicMatch } from "../apis/MusicMatch/musicMatch";
//Given a number k, returns a pseudorandom number in 0..k-1
const getRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}

export const getTwoTracks = async (country, track1, track1id) => {
    let tracks = await MusicMatch.getTopTracks(country, 10, 1);
    let rand2=getRandomNumber(10);
    let track2=tracks[rand2];

    if(track1){    
    return{
    tracka: track1, 
    trackANr: track1id,
    trackb: track2,
    trackbNr:rand2,
    }
    }
    else{
        if(rand2&2==0){
        let track1=tracks[rand2+1];
        return {
            tracka: track1, 
            trackANr: rand2+1,
            trackb: track2,
            trackbNr:rand2,
            }
        }
        else {
            let track1=tracks[rand2-1];
        return {
            tracka: track1, 
            trackANr: rand2-1,
            trackb: track2,
            trackbNr:rand2,
            }
        }

    }
}