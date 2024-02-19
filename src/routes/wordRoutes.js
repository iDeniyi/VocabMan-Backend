const express = require("express");
const router = express.Router();

const wordController = require("../controllers/wordController");

router.get("/word-of-the-day", wordController.getWordOfTheDay);

module.exports = router;
