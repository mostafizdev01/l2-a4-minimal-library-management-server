import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/routes/books.route';
import { borrowRoutes } from './app/routes/borrow.route';
const app: Application = express();


/// useing middleware
app.use(express.json());
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)


/// root route
app.get('/', (req: Request, res: Response) => {
  res.send("Wellcome to Server..")
})

// 404 routes
app.use((req, res, next) => {
  console.log(`❗️Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
  next()
});

export default app;