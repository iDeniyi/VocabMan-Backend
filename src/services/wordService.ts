import Word from "../models/Word";

require("dotenv").config();

export const getRandomWord = async () => {
    try {
        const randomWords = await Word.aggregate([{ $sample: { size: 1 } }]);

        if (randomWords.length > 0) {
            return randomWords[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching a random word:", error);
        return null;
    }
};
