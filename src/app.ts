import express, { Application, Request, Response } from "express";
import cors from "cors";
import { booksRoutes } from "./app/routers/books.route";
import { borrowsRoutes } from "./app/routers/borrows.route";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api", booksRoutes);
app.use("/api", borrowsRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Library management API",
    success: true,
    info: "Visit README file for documentation https://github.com/raselahmedweb/level-2-assignment-3/blob/main/README.md",
  });
});

// 404 route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "404 not found", success: false });
});

export default app;
