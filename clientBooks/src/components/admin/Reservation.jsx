import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const initialForm = {
  user_id: '',
  book_title: '',
  reservation_date: '',
  return_date: '',
  status: 'active',
};

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('http://localhost:6000/api/reservations/list');
      setReservations(Array.isArray(res.data) ? res.data : res.data.reservations || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShow = () => {
    setFormData(initialForm);
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (reservation) => {
    setFormData({
      user_id: reservation.user_id,
      book_title: reservation.book_title,
      reservation_date: reservation.reservation_date ? reservation.reservation_date.slice(0, 16) : '',
      return_date: reservation.return_date ? reservation.return_date.slice(0, 16) : '',
      status: reservation.status,
    });
    setEditId(reservation.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await axios.delete(`http://localhost:6003/api/reservations/delete/${id}`);
        setMessage('Reservation deleted successfully.');
        fetchReservations();
      } catch (err) {
        console.error('Error deleting reservation:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:6002/api/reservations/update/${editId}`, formData);
        setMessage('Reservation updated successfully.');
      } else {
        await axios.post('http://localhost:6001/api/reservations/register', formData);
        setMessage('Reservation created successfully.');
      }
      fetchReservations();
      setShowModal(false);
      setFormData(initialForm);
    } catch (err) {
      console.error('Error saving reservation:', err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Book Reservations</h2>

      <Button variant="primary" onClick={handleShow}>
        + New Reservation
      </Button>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Book Title</th>
            <th>Reservation Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.user_id}</td>
                <td>{res.book_title}</td>
                <td>{res.reservation_date?.slice(0, 16).replace('T', ' ')}</td>
                <td>{res.return_date ? res.return_date.slice(0, 16).replace('T', ' ') : 'N/A'}</td>
                <td>{res.status}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(res)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(res.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Reservation' : 'New Reservation'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="book_title"
                value={formData.book_title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reservation Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="reservation_date"
                value={formData.reservation_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="returned">Returned</option>
                <option value="late">Late</option>
                <option value="cancelled">Cancelled</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
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

export default Reservation;
