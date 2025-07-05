import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
  try {
    // 🛡 Tomamos userId desde req.userId (protegido por middleware)
    const userId = req.userId;  
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is missing' });
    }

    // 🔍 Buscar usuario en MongoDB
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ✅ Respuesta con datos del usuario
    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 🍪 Configurar la cookie de autenticación
export const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, 
    secure: false, // 🔥 Cambia a `true` si es producción
    sameSite: "None", 
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  });
};
