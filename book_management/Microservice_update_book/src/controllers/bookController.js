// src/controllers/bookController.js
import { BookModel } from '../models/bookModel.js';

class BookController {
  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        author,
        category,
        lenguage,
        description,
        total_copies,
        available_copies,
        location
      } = req.body;

      const [updated] = await BookModel.update(
        {
          title,
          author,
          category,
          lenguage,
          description,
          total_copies,
          available_copies,
          location
        },
        { where: { id } }
      );

      if (updated === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const bookController = new BookController();
export { bookController }; 

