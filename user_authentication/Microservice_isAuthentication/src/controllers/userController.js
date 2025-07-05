// controllers/getUserData.js
import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // Obtenemos el userId del middleware (req.userId)

    // Buscar al usuario en la base de datos, excluyendo la contraseña
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      // Si no se encuentra el usuario, devolver error
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Devolver los datos del usuario sin la contraseña
    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });

  } catch (error) {
    // Manejar cualquier error del servidor
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
