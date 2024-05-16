import { Request, Response } from "express";

import {
    checkExistingActivity,
    createActivityLog,
    updateNewWordFlag,
} from "../services/activityService";

import User from "../models/User";

export const logUserActivity = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { challengeId, rating } = req.body;

        const existingLog = await checkExistingActivity(user.id, challengeId);
        if (existingLog) {
            return res.status(409).json({
                message: "Activity already logged for this challenge",
            });
        }

        await createActivityLog(challengeId, user.id, rating);
        user.updateStreak();
        user.updateRating(rating);

        return res
            .status(201)
            .json({ message: "Activity logged successfully" });
    } catch (error) {
        console.error("Failed to log user activity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateNewWord = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { challengeId, newWord } = req.body;

        if (newWord === undefined) {
            return res.status(400).json({ message: "Missing newWord status" });
        }

        const updatedActivity = updateNewWordFlag(
            user.id,
            challengeId,
            newWord
        );

        if (!updatedActivity) {
            return res.status(404).json({
                message: "Activity log not found or does not belong to user",
            });
        }

        res.status(200).json({
            message: "Activity updated successfully",
            updatedActivity,
        });
    } catch (error) {
        console.error("Failed to update activity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
