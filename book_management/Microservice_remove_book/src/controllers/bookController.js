import { BookModel } from '../models/bookModel.js';

class BookController {
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const result = await BookModel.destroy({ where: { id } });

      if (result === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200).json({ message: 'Book successfully deleted' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const bookController = new BookController();
export { bookController };
