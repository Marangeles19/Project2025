import { BookModel } from '../models/bookModel.js';

class BookController {
  async getAllBooks(req, res) {
    try {
      const books = await BookModel.findAll();
      res.json({ success: true, books });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ success: false, message: 'Error fetching books' });
    }
  }
}

const bookController = new BookController();
export { bookController };
