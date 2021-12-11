import { MusicMatch } from "../apis/MusicMatch/musicMatch";
//Given a number k, returns a pseudorandom number in 0..k-1
const getRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}

export const getTracks = async () => {
    let tracks = await MusicMatch.getTopTracks('us', 50, 1);
    if(tracks=== undefined){ return getTracks()};
    console.log("collect 50 tracks ", tracks);
    return{tracks}
}

export const getTwoTracks = async (id1, tracks) => {
    console.log("get 2 tracks tracks: ", tracks);
    let rand2=getRandomNumber(50);
    while(rand2===id1){ rand2=getRandomNumber(50)};
    console.log("random number ", rand2)
    let track2=tracks.tracks[rand2];
    console.log("track 2: ", track2);

    if(id1!==undefined && id1!=null){
        console.log("sending 1st: ", tracks.tracks[id1], track2);    
    return {track1:tracks.tracks[id1], id1:id1, track2:track2, id2:rand2, tracks:tracks}
    
    }
    else{
        if(rand2%2===0){
        let track1=tracks.tracks[rand2+1];
        console.log("sending 1st: ", track1, track2);
        return {track1:track1, id1:rand2+1, track2:track2, id2:rand2, tracks:tracks}
        }
        else {
        let track1=tracks.tracks[rand2-1];
        console.log("sending 1st: ", track1, track2);
        return {track1:track1, id1:rand2-1, track2:track2, id2:rand2, tracks:tracks}
        }

    }
}