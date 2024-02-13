const express = require("express");
const cors = require("cors");

const wordRoutes = require("./routes/wordRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", wordRoutes);

module.exports = app;
