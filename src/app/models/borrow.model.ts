import { model, Schema } from "mongoose"
import { BorrowStaticMethod, IBorrow } from "../interfaces/borrow.interface"
import { Book } from "./books.model"

const borrowSchema = new Schema<IBorrow, BorrowStaticMethod>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true,
        trim: true
    }
}, { versionKey: false, timestamps: true }
)

borrowSchema.static("BorrowCalculate", async function (bookId: string, bQuantity: number) {
    // console.log("static data is", bookId, bQuantity);
    const book = await Book.findById(bookId)
    if (!book) {
        throw new Error("Invalid id");
        return
    }
    const bookCopies = book?.copies;

    if(bQuantity === 0 || bQuantity < 0){
        throw new Error("Invalid Quantity");
        return
    }

    if (bookCopies < bQuantity) {
        throw new Error(`Only ${bookCopies} copies available`);
        return
    }

    book.copies -= bQuantity;

    if (bookCopies === 0) {
        book.available = false
        return
    }
    await book.save();
    return;
})


export const Borrows = model<IBorrow, BorrowStaticMethod>("borrow", borrowSchema)