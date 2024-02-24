require("dotenv").config();
const wordService = require("../services/wordService");

wordService
    .initializeWordsBuffer()
    .then(() => {
        console.log("Words buffer initialized successfully.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Failed to initialize words buffer:", error);
        process.exit(1);
    });
