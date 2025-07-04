import { Model, Types } from "mongoose";

export interface IBorrow {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}

export interface BorrowStaticMethod extends Model<IBorrow>{
    BorrowCalculate(bookId: string, bQuantity: number): void
}