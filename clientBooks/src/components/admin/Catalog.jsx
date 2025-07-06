import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const initialForm = {
  name: '',
  description: '',
  category: '',
};

const Catalog = () => {
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
      const res = await axios.get('http://localhost:3002/api/catalog/list');
      setBooks(res.data);
    } catch (err) {
      console.error('Error al obtener libros:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShow = () => {
    setFormData(initialForm);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setFormData({
      name: book.name || '',
      description: book.description || '',
      category: book.category || '',
    });
    setEditId(book.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await axios.delete(`http://localhost:3003/api/catalog/delete/${id}`);

        setMessage('Book successfully deleted');
        fetchBooks();
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3004/api/catalog/update/${editId}`,
          { id: editId, ...formData }
        );

        setMessage('Correctly updated book');
      } else {
        await axios.post(
          'http://localhost:3005/api/catalog/register',
          formData
        );
        setMessage('Correctly registered book');
      }
      fetchBooks();
      setShowModal(false);
      setFormData(initialForm);
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Catalog Management</h2>

      <Button variant="primary" onClick={handleShow}>
        + New Catalog
      </Button>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Catalog Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.category}</td>
              <td>{book.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(book)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Editar Libro' : 'Registrar Libro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="me-2"
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editMode ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Catalog;
