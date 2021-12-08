import { MusicMatch } from "../apis/MusicMatch/musicMatch";
//Given a number k, returns a pseudorandom number in 0..k-1
const getRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}

const hideWord = (words, i) => {
    words[i] = "_".repeat(words[i].length);
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
    let trackIndex = getRandomNumber(tracks.length);
    if(tracks[trackIndex].has_lyrics === 0) {
        return getRandomLyrics(country, amount, page)
    }
    console.log(tracks);
    let track_id = tracks[trackIndex].track.track_id
    let lyrics = await MusicMatch.getLyrics(track_id);
    console.log(lyrics);
    if(/[\u3400-\u9FBF]/.test(lyrics.lyrics_body)) {
        return getRandomLyrics(country,amount,page)
    }
    return {lyrics: lyrics.lyrics_body, 
        artist: tracks[trackIndex].track.artist_name, 
        track: tracks[trackIndex].track.track_name,
        album: tracks[trackIndex].track.album_name,
    }
}

const parseSentence = (lyrics) => {
    let sentences = lyrics.replace(/\\P{L}+/,"").split(/\n+/);        
    let words;     //-2 to remove copyright junk at the end
    let words1;
    let tries = 0;
    while(true) {
        let random = getRandomNumber(sentences.length-2);
        if(random == 0) continue;
        words1 = sentences[random-1];
        words = sentences[random].split(" ");
        if(!(words.length < 3 || tries > 5)) {
            break;
        }
        tries++;
    }
    return {helpsentence: words1, words: words}
}

const specialCharacters = ["(", ")", "[", "]", "!", "?", ".", ",", "-"];
const parseWord = (word) => {
    if(word.length <= 1) return {word1: word, word2: word};
    word = word.split("");
    word = word.filter(char => !specialCharacters.includes(char))
    if(word.length <= 1) return {word1: word.join(''), word2: word.join('')};
    if(word[word.length-1] === '\'') {
        const fst = [...word];
        word[word.length-1] = 'g';
        return {word1: fst.join(""), word2: word.join("")}
    }

    for(let i = 0; i < word.length; i++) {
        if(word[i] === '\'') {
            const fst = [...word];
            word[i] = '';
            return {word1: fst.join(""), word2: word.join("")}
        }
    }
    return {word1: word.join(""), word2: word.join("")}
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
    let {lyrics, artist, track, album} = await getRandomLyrics(country, amount, page);
    let {helpsentence, words} = parseSentence(lyrics);  
    let i = getRandomNumber(words.length);
    let {word1, word2} = parseWord(words[i]);
    return {
        word: {word1, word2},
        sentence: {helpsentence, hid: hideWord(words, i)},
        artist,
        track,
        album,
    }
}

