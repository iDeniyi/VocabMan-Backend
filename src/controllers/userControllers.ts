import { Request, Response, NextFunction } from "express";

import User, { IUser } from "../models/User";
import { constructUserResponse } from "../services/userService";

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUser = constructUserResponse(user);
        res.json(currentUser);
    } catch {}
};
