import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/dbConfig";
import { initializeDailyChallengeBuffer } from "./services/challengeService";

const port = process.env.PORT!;
const uri = process.env.MONGO_URI_PROD!;

async function startServer() {
    try {
        await connectDB(uri);

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
            initializeDailyChallengeBuffer()
                .then(() => {
                    console.log("Words buffer initialized successfully.");
                })
                .catch((error) => {
                    console.error("Failed to initialize words buffer:", error);
                });
        });

        app.get("/", (req, res) => {
            res.status(200).send("Testing response from the server!");
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();
