import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        console.log("DB Connection Successful");
    } catch (err) {
        console.error(`DB Connection failed: ${err}`);
    }
};

export const disconnectDB = async () => mongoose.disconnect();
