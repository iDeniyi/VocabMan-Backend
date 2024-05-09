import { Schema, model } from "mongoose";

interface IActivityLog {
    dailyChallengeId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    stars: Number;
    newWord: Boolean;
    date: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
    dailyChallengeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "DailyChallenge",
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    stars: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const ActivityLog = model<IActivityLog>("ActivityLog", activityLogSchema);

export default ActivityLog;
