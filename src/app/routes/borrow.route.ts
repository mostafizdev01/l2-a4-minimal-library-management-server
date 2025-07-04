import express, { Request, Response } from "express"
import { Borrows } from "../models/borrow.model";
import { title } from "process";

export const borrowRoutes = express.Router()


/// create borrow
borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        //// used static model
        await Borrows.BorrowCalculate(body.book, body.quantity)
        
        const data = await Borrows.create(body)

        res.status(201).json({
            success: true,
            message: "Book borrow successfully ✅",
            data
        })
    } catch (error: any) {
         res.status(401).json({
            success: false,
            message: "Borrow Faild",
            error: error.message
        })
    }
})
/// create get
borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
       const data = await Borrows.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: {$sum: "$quantity"}
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo"
            }
        },
        {
            $unwind: "$bookInfo"
        },
        {
            $project: {
                _id: 0,
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn"
                },
                totalQuantity: 1 
            }
        }
       ])
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully ✅",
            data
        })
    } catch (error: any) {
         res.status(401).json({
            success: false,
            message: "Failed to get summary",
            error: error.message
        })
    }
})