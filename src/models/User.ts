import { Schema, model, Document } from "mongoose";

interface IStreak {
    count: number;
    lastActive: Date | null;
    longest: number;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    streak: IStreak;
    rating: number;
    attempts: number;

    updateStreak: () => void;
    updateRating: (newRating: number) => void;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    streak: {
        count: { type: Number, default: 0 },
        lastActive: { type: Date, default: null },
        longest: { type: Number, default: 0 },
    },
    rating: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
});

userSchema.methods.updateStreak = async function () {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (this.streak.lastActive) {
        if (this.streak.lastActive.toDateString() === today.toDateString()) {
            return;
        }

        if (
            this.streak.lastActive.toDateString() === yesterday.toDateString()
        ) {
            this.streak.count++;
        } else {
            this.streak.count = 1;
        }

        this.streak.longest = Math.max(this.streak.longest, this.streak.count);
    } else {
        this.streak.count = 1;
    }

    this.streak.lastActive = today;
    await this.save();
};

userSchema.methods.updateRating = async function (newRating: number) {
    this.rating =
        (this.rating * this.attempts + newRating) / (this.attempts + 1);
    this.attempts++;
    await this.save();
};

const User = model<IUser>("User", userSchema);

export default User;
