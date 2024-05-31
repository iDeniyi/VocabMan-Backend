import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "../config/dbConfig";
import { resetStreaks } from "../services/userService";

async function runUpdate() {
    try {
        await connectDB(process.env.MONGO_URI!);
        await resetStreaks();
    } catch (error) {
        console.error("Failed to update Words buffer", error);
        process.exit(1);
    } finally {
        await disconnectDB();
        process.exit(0);
    }
}

runUpdate();
