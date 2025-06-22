import express from "express";
import multer from "multer";
import { bookController } from "../controllers/bookController.js";

const bookRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

bookRouter.put("/update/:id", (req, res) => bookController.updateBook(req, res));

export default bookRouter;