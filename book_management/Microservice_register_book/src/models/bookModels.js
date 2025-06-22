import { database } from '../config/mysqldb.js';
import { DataTypes } from 'sequelize';

const BookModel = database.define('book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  lenguage: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  total_copies: { type: DataTypes.INTEGER, allowNull: false },
  available_copies: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'book',
  timestamps: false,
});

export { BookModel };
