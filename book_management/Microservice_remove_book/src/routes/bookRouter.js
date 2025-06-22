import express from "express";
import multer from "multer";
import { bookController } from "../controllers/bookController.js";

const bookRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to delete a book by ID
bookRouter.delete("/delete/:id", (req, res) => bookController.deleteBook(req, res));

export default bookRouter;
