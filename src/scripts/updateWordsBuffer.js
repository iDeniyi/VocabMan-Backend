require("dotenv").config();
const wordService = require("../services/wordService");

wordService
    .updateWordsBuffer()
    .then(() => {
        console.log("Word of the Day updated successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Failed to update Word of the Day:", error);
        process.exit(1);
    });
