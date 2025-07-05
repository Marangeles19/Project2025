import * as reservationModel from '../models/reservationModel.js'; 

const updateReservation = async (req, res) => {
  try {
    console.log('👉 Body recibido:', req.body); // para debug
    console.log('👉 Params recibido:', req.params); // para debug

    const { book_title, return_date, status } = req.body;
    const { id } = req.params;

    if (!id || !book_title || !status) {
      return res.status(400).json({ 
        message: 'Fields id, book_title, and status are required' 
      });
    }

    const updatedReservation = await reservationModel.updateReservation(
      id, 
      book_title, 
      return_date, 
      status
    );

    res.status(200).json({ success: true, reservation: updatedReservation });
  } catch (err) {
    console.error('Error updating reservation', err);
    res.status(500).json({ 
      message: 'Error updating reservation', 
      error: err.message 
    });
  }
};

export { updateReservation };
