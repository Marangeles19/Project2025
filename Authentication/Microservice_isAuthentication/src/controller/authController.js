import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// Middleware de autenticación para verificar el token
export const isAuthenticated = async (req, res) => {
  const token = req.cookies.token;  // Obtener el token desde las cookies

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Asignar el usuario decodificado al request
    return res.json({ success: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generar OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;  // Guardamos el OTP en el campo correcto
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // Expira en 24 horas
    await user.save();

    // Enviar correo con OTP
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for resetting your password is: ${otp}. Use this OTP to reset your password.`
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: 'OTP sent to email' });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verificar OTP y confirmar email
export const verifiEmail = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ success: false, message: 'OTP is required' });
  }

  try {
    // Buscar usuario con OTP válido
    const user = await userModel.findOne({ verifyOtp: otp });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Marcar el usuario como verificado
    user.isAccountVerified = true;
    user.verifyOtp = null; // Eliminar el OTP después de usarlo
    user.verifyOtpExpireAt = null;
    await user.save();

    return res.json({ success: true, message: 'Account verified successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
