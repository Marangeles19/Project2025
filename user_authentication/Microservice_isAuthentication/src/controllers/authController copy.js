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
    return res.json({ success: true });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: 'OTP sent to email' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Asegúrate de que esta función esté definida y exportada
export const verifiEmail = async (req, res) => {
  const { otp } = req.body;
  // Lógica de verificación de email usando OTP
  try {
    // Supongamos que validas el OTP y el usuario
    const user = await userModel.findOne({ 'resetOtp': otp });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Si es válido, puedes actualizar la verificación del usuario
    user.isAccountVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};