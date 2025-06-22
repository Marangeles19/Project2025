import express from "express";
import { bookController } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.post("/add", (req, res) => bookController.addBook(req, res));

export default bookRouter;