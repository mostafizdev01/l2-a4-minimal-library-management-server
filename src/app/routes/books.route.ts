import express, { Request, Response } from "express"
import { Book } from "../models/books.model";
import { z } from "zod";

export const bookRoutes = express.Router()

const CreateBookZod = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number(),
    available: z.boolean()
})

// create book
bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = await CreateBookZod.parseAsync(req.body);
        const data = await Book.create(body)

        res.status(201).json({
            success: true,
            message: "Book posted successfully ✅",
            data
        })
    } catch (error) {
        res.status(203).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
})

// find all book data
bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit="5", page="1" } = req.query;

        const pageNumber = parseInt(page as string)
        const limitNumber = parseInt(limit as string)

        const skip = (pageNumber -1) * limitNumber;
        

        // Filtering
        const filterCondition = filter ? { genre: filter } : {};

        // Sorting
        const sortCondition: { [sortBy: string]: 1 | -1 } = {};
        sortCondition[sortBy as string] = sort === 'asc' ? 1 : -1;

        const total = await Book.countDocuments();

        // Fetch from DB
        const books = await Book.find(filterCondition)
            .sort(sortCondition)
            .skip(skip)
            .limit(limitNumber)

        res.json({
            success: true,
            message: "Books retrieved successfully",
            totalPage: Math.ceil(total / limitNumber),
            pageNumber,
            limitNumber,
            data: books,
        });
    } catch (error) {
        console.log(error);
    }
})

// find single book
bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = await Book.findById(bookId)
        if (data === null) {
            res.status(301).json({
                success: false,
                message: "Book Not Available 🤕"
            })
        }
        res.status(201).json({
            success: true,
            message: "Book finded successfully ✅",
            data
        })
    } catch (error: any) {
        res.status(301).json({
            success: false,
            message: "Book Not Available 🤕",
            error: error.message
        })
    }
})

/// update book
bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const data = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true })
        if (data === null) {
            res.status(301).json({
                success: false,
                message: "Book Not Available 🤕"
            })
        }
        res.status(201).json({
            success: true,
            message: "Book Updated successfully ✅",
            data
        })
    } catch (error: any) {
        res.status(301).json({
            success: false,
            error: error.message
        })
    }
})

/// deleted book
bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndDelete(bookId)
        if (data === null) {
            res.status(301).json({
                success: false,
                message: "Book Not Found! 🤕"
            })
        }
        res.status(201).json({
            success: true,
            message: "Book deleted successfully ✅",
            data
        })
    } catch (error) {
        console.log(error);
    }
})
