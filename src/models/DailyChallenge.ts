import { Document, Schema, model } from "mongoose";

interface IDailyChallenge extends Document {
    wordId: Schema.Types.ObjectId;
    date: Date;
}

const dailyChallengeSchema = new Schema<IDailyChallenge>({
    wordId: {
        type: Schema.Types.ObjectId,
        ref: "Word",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const DailyChallenge = model<IDailyChallenge>(
    "DailyChallenge",
    dailyChallengeSchema
);

export default DailyChallenge;
