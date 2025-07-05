import * as reservationModel from '../models/reservationModel.js';

const deleteReservation = async (req, res) => {
    const { id } = req.params;  

    try {
        const result = await reservationModel.deleteReservation(id);  

        if (!result) {
            return res.status(404).json({ message: 'User not found' });  
        }

        return res.status(200).json({ message: 'Reservation deleted successfully', id: result.id }); 
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'Error deleting reservation' });
    }
};

export { deleteReservation };