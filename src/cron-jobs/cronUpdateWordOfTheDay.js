require("dotenv").config();
const wordService = require("../services/wordService");

wordService
    .updateWordOfTheDay()
    .then((wordOfTheDay) => {
        console.log("Word of the Day updated successfully:", wordOfTheDay);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Failed to update Word of the Day:", error);
        process.exit(1);
    });
