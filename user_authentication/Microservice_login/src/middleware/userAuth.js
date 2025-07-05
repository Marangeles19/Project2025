// middleware/userAuth.js
import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  // Obtener el token de las cookies
  const token = req.cookies.token;

  // Si no hay token, devolver error de autorización
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized. Login Again',
    });
  }

  try {
    // Decodificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si el ID está en el token, asignarlo a req.userId
    if (decoded.id) {
      req.userId = decoded.id; // Cambié a req.userId
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login Again',
      });
    }

    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    // Si el token no es válido, devolver error
    return res.status(401).json({
      success: false,
      message: 'Invalid token, please login again.',
    });
  }
};

export default userAuth; // Asegúrate de usar export default
