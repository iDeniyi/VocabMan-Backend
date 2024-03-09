require("dotenv").config();
const wordService = require("../services/wordService");

wordService
    .updateWordsBuffer()
    .then(() => {
        console.log("Words buffer updated successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Failed to update Words buffer", error);
        process.exit(1);
    });
