import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const initialForm = {
  title: '',
  author: '',
  category: '',
  language: '',
  description: '',
  total_copies: 0,
  available_copies: 0,
  location: '',
};

const RegisterBook = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:4001/api/books/list');
      console.log('Respuesta de API:', res.data);
      // Cambia esto si tu API devuelve books como propiedad
      if (Array.isArray(res.data)) {
        setBooks(res.data);
      } else if (Array.isArray(res.data.books)) {
        setBooks(res.data.books);
      } else {
        setBooks([]); // fallback para evitar crash
      }
    } catch (err) {
      console.error('Error al obtener libros:', err);
      setBooks([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof initialForm[name] === 'number' ? Number(value) : value,
    }));
  };

  const handleShow = () => {
    setFormData(initialForm);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setFormData({ ...book });
    setEditId(book.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este libro?')) {
      try {
        await axios.delete(`http://localhost:4003/api/books/delete/${id}`);
        setMessage('Libro eliminado correctamente');
        fetchBooks();
      } catch (err) {
        console.error('Error al eliminar:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:4002/api/books/update/${editId}`, formData);
        setMessage('Libro actualizado correctamente');
      } else {
        await axios.post('http://localhost:4000/api/books/register', formData);
        setMessage('Libro registrado correctamente');
      }
      fetchBooks();
      setShowModal(false);
      setFormData(initialForm);
    } catch (err) {
      console.error('Error al guardar libro:', err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Book Management</h2>

      <Button variant="primary" onClick={handleShow}>+ Nuevo Libro</Button>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoría</th>
            <th>Idioma</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Copias</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.language}</td>
                <td>{book.description}</td>
                <td>{book.location}</td>
                <td>{book.available_copies} / {book.total_copies}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(book)} className="me-2">Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(book.id)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No hay libros registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Libro' : 'Registrar Libro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {Object.entries(initialForm).map(([key, value]) => (
              <Form.Group key={key} className="mb-3">
                <Form.Label>{key.replace('_', ' ').toUpperCase()}</Form.Label>
                <Form.Control
                  type={typeof value === 'number' ? 'number' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">Cancelar</Button>
              <Button variant="primary" type="submit">{editMode ? 'Actualizar' : 'Guardar'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RegisterBook;
