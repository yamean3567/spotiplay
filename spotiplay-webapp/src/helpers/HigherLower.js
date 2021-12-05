import { MusicMatch } from "../apis/MusicMatch/musicMatch";
//Given a number k, returns a pseudorandom number in 0..k-1
const getRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}


export const getTwoTracks = async (country, track1) => {
    let tracks = await MusicMatch.getTopTracks(country, 10, 1);
    let rand2=getRandomNumber(10);
    let track2=tracks[rand2];

    if(track1){    
    return [track1, track2];
    }
    else{
        let track1=tracks[getRandomNumber(10)];
    while(track1==track2){
        track1=tracks[getRandomNumber(10)];
    }
        return [track1, track2];
    }
}
/*
  Given lyrics, selects a pseudorandom word to remove.
  Returns object with altered string and word that was removed.
  Sample input and output:
  Input: Lorem ipsum dolor sit amet
  Output: {word: dolor, sentence: Lorem ipsum ***** sit amet}*/
