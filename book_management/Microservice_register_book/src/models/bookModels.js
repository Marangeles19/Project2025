import { database } from '../config/mysqldb.js';
import { DataTypes } from 'sequelize';

const BookModel = database.define('Books', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  lenguage: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  total_copies: { type: DataTypes.INTEGER, allowNull: false },
  available_copies: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'books',
  timestamps: false,
});

export { BookModel };
