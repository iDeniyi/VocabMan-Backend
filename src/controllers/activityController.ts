import { Request, Response } from "express";

import User, { IUser } from "../models/User";
import ActivityLog from "../models/ActivityLog";

import { updateStreak } from "../services/userService";

export const logUserActivity = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findById(req.user.id);
        const userId = user?.id;

        const { challengeId, stars } = req.body;

        const existingLog = await ActivityLog.findOne({
            userId,
            dailyChallengeId: challengeId,
        });

        if (existingLog) {
            return res.status(201).json({
                message: "Activity already logged for this challenge",
            });
        }

        const newActivity = new ActivityLog({
            dailyChallengeId: challengeId,
            userId,
            stars,
        });

        newActivity.save();

        user ? updateStreak(user) : console.log("no user");
        return res
            .status(201)
            .json({ message: "Activity logged successfully" });
    } catch {}
};
