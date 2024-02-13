const express = require("express");
const router = express.Router();

const wordController = require("../controllers/wordController");

router.get("/word-of-the-day", wordController.getWordOfTheDay);
router.put("/word-of-the-day", wordController.updateWordOfTheDay);

module.exports = router;
