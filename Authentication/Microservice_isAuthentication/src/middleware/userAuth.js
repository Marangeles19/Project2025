// middleware/userAuth.js
import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies?.token;

    // Si no hay token, devolver error de autorización
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in.',
      });
    }

    // Decodificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
      });
    }

    // Asignar el usuario decodificado a req.userId
    req.userId = decoded.id;
    next(); // Pasar al siguiente middleware o controlador

  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    // Verificar si el error es por expiración del token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    });
  }
};

export default userAuth;
