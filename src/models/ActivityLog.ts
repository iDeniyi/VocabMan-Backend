import { Schema, model } from "mongoose";

export interface IActivityLog {
    dailyChallengeId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    rating: Number;
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
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
    newWord: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const ActivityLog = model<IActivityLog>("ActivityLog", activityLogSchema);

export default ActivityLog;
