import { BookModel } from '../models/bookModels.js';

class BookController {
  async addBook(req, res) {
    try {
      const { title, author, category, lenguage, description, total_copies, available_copies, location} = req.body;

      // Create the new book and save it in the DB
      const newBook = await BookModel.create({
        title,
        author,
        category,
        lenguage,
        description,
        total_copies: 1, // Asignar un valor por defecto
        available_copies: 1, // Asignar un valor por defecto
        location,
      });

      // Return the new book in the answer
      res.json({
        success: true,
        message: 'Book added successfully',
        book: newBook, // This includes the book created
      });
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ success: false, message: 'Error adding Book' });
    }
  }
}

const bookController = new BookController();
export { bookController };