import { Request, Response } from "express";
import { filterChallengeByDate } from "../services/challengeService";

export const getChallengeByDate = async (req: Request, res: Response) => {
    const dateString = req.params.date;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return res
            .status(400)
            .send("Invalid date format. Please use YYYY-MM-DD.");
    }
    try {
        const date = new Date(dateString);
        const challenge = await filterChallengeByDate(date);
        res.json(challenge);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
