import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// Send verification OTP to the User's email
export const sendVerifiOTP = async (req, res) => {
  try {
    // Obtener userId desde el token (más seguro que pasar en el body)
    const { userId } = req.userId; 

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await userModel.findById(userId);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verificar si la cuenta ya está verificada
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    // Verificar si el OTP aún es válido (si lo hay)
    if (user.verifyOtpExpireAt > Date.now()) {
      return res.json({
        success: false,
        message: 'An OTP was already sent. Please check your email.',
      });
    }

    // Generar un nuevo OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;  // Guardar OTP
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // Expira en 24 horas

    // Guardar cambios en la base de datos
    await user.save();

    // Configuración del correo
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Account Verification OTP',
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "Verification OTP sent to email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
