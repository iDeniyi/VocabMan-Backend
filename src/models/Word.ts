import { Schema, model } from "mongoose";

export interface IWord extends Document {
    word: string;
    difficulty: number;
    definition: string;
}

const wordSchema = new Schema<IWord>({
    word: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
});

const Word = model<IWord>("Word", wordSchema);

export default Word;
