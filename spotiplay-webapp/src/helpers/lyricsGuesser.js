import { MusicMatch } from "../apis/MusicMatch/musicMatch";
//Given a number k, returns a pseudorandom number in 0..k-1
const getRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}

const hideWord = (words, i) => {
    words[i] = "_ ".repeat(words[i].length);
    return words.join(" ");
}

const countries = ["US", "UK"];

export const getCountry = () => {
    const i = getRandomNumber(countries.length);
    const country = countries[i];
    return country;
}

const getRandomLyrics = async (country, amount, page) => {
    let tracks = await MusicMatch.getTopTracks(country, amount, page);
    let track_id = tracks[getRandomNumber(tracks.length)].track.track_id
    let lyrics = await MusicMatch.getLyrics(track_id);
    if(!lyrics || lyrics.lyrics_body === '') {
        //ban the track id.
        console.log(lyrics);
        return getRandomLyrics(getCountry(getRandomNumber(2)), (Math.floor(Math.random() * 2) + 1), 10)
    }
    return lyrics.lyrics_body;
}
/*
  Given lyrics, selects a pseudorandom word to remove.
  Returns object with altered string and word that was removed.
  Sample input and output:
  Input: Lorem ipsum dolor sit amet
  Output: {word: dolor, sentence: Lorem ipsum ***** sit amet}*/
export const getSentenceAndWord = async () => {
    let country = getCountry(getRandomNumber(2));
    let page = Math.floor(Math.random() * 2) + 1;         //ändra sen
    let amount = 10;
    let lyrics = await getRandomLyrics(country, amount, page);
    
    let sentences = lyrics.replace(/[^a-zA-Z\n ]/g,"").split(/\n+/);        
    let words = sentences[getRandomNumber(sentences.length-2)].split(" ");    //-2 to remove copyright junk at the end
    let i = getRandomNumber(words.length);
    return {
        word: words[i],
        sentence: hideWord(words, i),
    }
}

