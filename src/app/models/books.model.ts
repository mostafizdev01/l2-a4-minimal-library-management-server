import { Model, model, Schema } from "mongoose"
import { IBook } from "../interfaces/books.interface"

const noteSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        required: true,
        trim: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },

    isbn: { type: String, required: true, trim: true, unique: true },

    description: { type: String, default: '', trim: true },

    copies: { type: Number, required: true, trim: true, min: 0 },

    available: { type: Boolean, default: true },
    
}, { versionKey: false, timestamps: true }
)

export const Book = model<IBook>("Book", noteSchema)