require("dotenv").config();

const axios = require("axios");
const path = require("path");
const fs = require("fs");

const wordsFilePath = path.join(__dirname, "..", "data", "words.json");
let wordOfTheDay = {};

function getRandomWord() {
    try {
        const dataString = fs.readFileSync(wordsFilePath, "utf-8");
        const data = JSON.parse(dataString);
        const words = data.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        return randomWord.word;
    } catch (error) {
        console.error("Error reading file or selecting a random word:", error);
    }
}

async function getWordDetails(word) {
    const headers = {
        "X-RapidAPI-Key": process.env.WORDS_API_KEY,
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    };

    try {
        const [definitionsRes, antonymsRes, synonymsRes, examplesRes] =
            await Promise.all([
                axios.get(
                    `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
                    { headers }
                ),
                axios.get(
                    `https://wordsapiv1.p.rapidapi.com/words/${word}/antonyms`,
                    { headers }
                ),
                axios.get(
                    `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
                    { headers }
                ),
                axios.get(
                    `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`,
                    { headers }
                ),
            ]);

        return {
            definitions: definitionsRes.data.definitions,
            antonyms: antonymsRes.data.antonyms,
            synonyms: synonymsRes.data.synonyms,
            examples: examplesRes.data.examples,
        };
    } catch (error) {
        console.error("Error fetching word details:", error);
        return {};
    }
}

function structureObject(word, details) {
    wordOfTheDay = {
        word: word,
        definition: details.definitions[0],
        synonyms: details.synonyms,
        antonyms: details.antonyms,
        examples: details.examples,
    };
    return wordOfTheDay;
}

async function updateWordOfTheDay() {
    randomWord = getRandomWord();
    const wordDetails = await getWordDetails(randomWord);
    wordOfTheDay = structureObject(randomWord, wordDetails);
    return wordOfTheDay;
}

async function getWordOfTheDay() {
    return wordOfTheDay;
}
module.exports = { getWordOfTheDay, updateWordOfTheDay };
