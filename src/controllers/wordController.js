const wordService = require("../services/wordService");

const getWordOfTheDay = async (req, res) => {
    try {
        const wordOfTheDay = await wordService.getWordOfTheDay();
        res.json(wordOfTheDay);
    } catch (error) {
        console.error(error);
    }
};

const updateWordOfTheDay = async (req, res) => {
    try {
        await wordService.updateWordOfTheDay();
        res.json("word updated");
    } catch (error) {
        console.error(error);
    }
};
module.exports = { getWordOfTheDay, updateWordOfTheDay };
