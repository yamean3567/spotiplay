//Given a number k, returns a pseudorandom number in 1..k-1
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
/*
  Given lyrics, selects a pseudorandom word to remove.
  Returns object with altered string and word that was removed.
  Sample input and output:
  Input: Lorem ipsum dolor sit amet
  Output: {word: dolor, sentence: Lorem ipsum ***** sit amet}*/
export const getSentenceAndWord = (lyrics) => {
    let sentences = lyrics.replace(/[^a-zA-Z\n ]/g,"").split(/\n+/);        
    let words = sentences[getRandomNumber(sentences.length-2)].split(" ");    //-2 to remove copyright junk at the end
    let i = getRandomNumber(words.length);
    return {
        word: words[i],
        sentence: hideWord(words, i),
    }
}
