import { Request, Response } from "express";
import User from "../models/User";
import {
    hashPassword,
    createUserToken,
    validatePassword,
    constructUserResponse,
} from "../services/userService";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = createUserToken(savedUser);

        res.status(201).json({
            user: constructUserResponse(savedUser),
            token,
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).send("User not found");

        const isMatch = await validatePassword(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const token = createUserToken(user);
        res.status(201).json({
            user: constructUserResponse(user),
            token,
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
