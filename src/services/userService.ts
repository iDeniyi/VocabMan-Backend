import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { format } from "date-fns";
import mongoose from "mongoose";

import User, { IUser } from "../models/User";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const createUserToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
    });
};

export const validatePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

export const constructUserResponse = (user: IUser) => {
    return {
        username: user.username,
        createdAt: format(new Date(user.createdAt), "yyyy-MM-dd"),
        currentStreak: user.streak.count,
        longestStreak: user.streak.longest,
        rating: user.rating,
    };
};

export const resetStreaks = async () => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setUTCDate(today.getUTCDate() - 1);

        yesterday.setUTCHours(0, 0, 0, 0);

        const result = await User.updateMany(
            {
                "streak.lastActive": { $ne: null, $lt: yesterday },
            },
            {
                $set: { "streak.count": 0 },
            }
        );

        console.log(`Streaks reset for ${result.modifiedCount} users`);
    } catch (error) {
        console.error("Error resetting streaks:", error);
    } finally {
        mongoose.connection.close();
    }
};
