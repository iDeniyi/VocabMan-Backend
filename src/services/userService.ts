import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isSameDay, addDays, format } from "date-fns";

import { IUser } from "../models/User";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const createUserToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
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
    };
};

export const updateStreak = (user: IUser) => {
    const today = new Date();
    const isContinuingStreak =
        user.streak.lastActive &&
        isSameDay(addDays(new Date(user.streak.lastActive), 1), today);

    if (isContinuingStreak) {
        user.streak.count += 1;
    } else {
        user.streak.count = 1;
    }

    if (user.streak.count > user.streak.longest) {
        user.streak.longest = user.streak.count;
    }
    user.streak.lastActive = today;
    user.save();
};
