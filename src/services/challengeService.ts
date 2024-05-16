import { format, addDays } from "date-fns";

import { getRandomWord } from "./wordService";

import DailyChallenge from "../models/DailyChallenge";
import Word from "../models/Word";

export const initializeDailyChallengeBuffer = async () => {
    const today = new Date();
    for (let i = 0; i <= 3; i++) {
        const date = addDays(today, i);
        const formattedDate = format(date, "yyyy-MM-dd");
        try {
            const word = await getRandomWord();
            const newChallenge = new DailyChallenge({
                date: formattedDate,
                wordId: word._id,
            });
            await newChallenge.save();
            console.log(`Word for ${formattedDate} added successfully.`);
        } catch (error) {
            console.error(`Error adding word for ${formattedDate}:`, error);
        }
    }
};

export const updateDailyChallengeBuffer = async () => {
    const threeDaysFromNow = addDays(new Date(), 3);
    const formattedDate = format(threeDaysFromNow, "yyyy-MM-dd");
    try {
        const word = await getRandomWord();
        const newChallenge = new DailyChallenge({
            date: formattedDate,
            word: word._id,
        });
        await newChallenge.save();
        console.log(`Word for ${formattedDate} added successfully.`);
    } catch (error) {
        console.error(`Error adding word for ${formattedDate}:`, error);
    }
};

export const filterChallengeByDate = async (date: Date) => {
    const challenges = await DailyChallenge.aggregate([
        { $match: { date: date } },
        {
            $lookup: {
                from: Word.collection.name,
                localField: "wordId",
                foreignField: "_id",
                as: "wordDetails",
            },
        },
        { $unwind: "$wordDetails" },
    ]);

    // capitalize the word
    if (
        challenges[0] &&
        challenges[0].wordDetails &&
        challenges[0].wordDetails.word
    ) {
        challenges[0].wordDetails.word =
            challenges[0].wordDetails.word.toUpperCase();
    }

    return challenges[0];
};
