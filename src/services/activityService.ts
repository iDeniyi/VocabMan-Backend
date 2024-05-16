import ActivityLog from "../models/ActivityLog";
import { IActivityLog } from "../models/ActivityLog";

export const checkExistingActivity = async (
    userId: string,
    challengeId: string
): Promise<IActivityLog | null> => {
    return ActivityLog.findOne({
        userId,
        dailyChallengeId: challengeId,
    });
};

export const createActivityLog = async (
    challengeId: string,
    userId: string,
    rating: number
): Promise<IActivityLog> => {
    const newActivity = new ActivityLog({
        dailyChallengeId: challengeId,
        userId,
        rating,
    });
    await newActivity.save();
    return newActivity;
};

export const updateNewWordFlag = async (
    challengeId: string,
    userId: string,
    newWord: boolean
) => {
    await ActivityLog.findOneAndUpdate(
        {
            userId: userId,
            dailyChallengeId: challengeId,
        },
        {
            $set: { newWord: newWord },
        },
        { new: true }
    );
};