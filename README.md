# Library Management API

This is a Library Management System API built with Express, TypeScript, and MongoDB using Mongoose.

## Features

- Book Management
- Borrow Management
- Borrow Summary
- Filtering and Sorting
- Error Handling
- Mongoose Middleware

## Installation:

Clone the Repository

```bash
npm install
```

## Create .env file and add your MongoDB driver url as mongodbUrl=......

.env

```bash
mongodbUrl="your mongodb url in here"
```

## Run the Application

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

## Test the API:

Use tools like Postman or Thunder to test the API endpoints.

## API Endpoints

- **GET** `/api/books`
- **POST** `/api/books`
- **PATCH** `/api/books/:bookId`
- **DELETE** `/api/books/:bookId`
- **GET** `/api/borrow`
- **POST** `/api/borrow`

## Create a new book.

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```


## Deployment link

[Live deployment link](https://level-2-assignment-3-rouge.vercel.app)
