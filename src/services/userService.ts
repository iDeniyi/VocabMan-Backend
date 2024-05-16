import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { format } from "date-fns";

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
