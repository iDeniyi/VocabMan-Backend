import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    streak: {
        count: number;
        lastActive: Date;
        longest: number;
    };
    avgStars: number;
    activityLog: Date[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    streak: {
        count: { type: Number, default: 0 },
        lastActive: { type: Date, default: Date.now },
        longest: { type: Number, default: 0 },
    },
});

const User = model<IUser>("User", userSchema);

export default User;
