import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const initialForm = {
  title: '',
  author: '',
  category: '',
  lenguage: '',
  description: '',
  total_copies: 0,
  available_copies: 0,
  location: '',
};

const RegisterBook = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error al obtener libros:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShow = () => {
    setFormData(initialForm);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditId(book.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await axios.delete(`http://localhost:4000/api/books/${id}`);
        fetchBooks();
        setMessage("Libro eliminado correctamente");
      } catch (err) {
        console.error('Error al eliminar libro:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:4000/api/books/${editId}`, formData);
        setMessage("Libro actualizado correctamente");
      } else {
        await axios.post('http://localhost:4000/api/books', formData);
        setMessage("Libro registrado correctamente");
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
      <h2 className="mb-4 text-center">Gestión de Libros</h2>

      <Button variant="primary" onClick={handleShow}>
        + Nuevo Libro
      </Button>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      <div className="row mt-4">
        {books.map(book => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p><strong>Autor:</strong> {book.author}</p>
                <p><strong>Categoría:</strong> {book.category}</p>
                <p><strong>Idioma:</strong> {book.lenguage}</p>
                <p><strong>Descripción:</strong> {book.description}</p>
                <p><strong>Ubicación:</strong> {book.location}</p>
                <p><strong>Copias:</strong> {book.available_copies}/{book.total_copies}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Button variant="warning" size="sm" onClick={() => handleEdit(book)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(book.id)}>Eliminar</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear/editar libro */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Editar Libro" : "Registrar Libro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {Object.keys(initialForm).map((key) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>{key.replace('_', ' ').toUpperCase()}</Form.Label>
                <Form.Control
                  type={typeof initialForm[key] === 'number' ? 'number' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editMode ? "Actualizar" : "Guardar"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RegisterBook;
