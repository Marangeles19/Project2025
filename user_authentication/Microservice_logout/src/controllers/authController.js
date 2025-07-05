import jwt from 'jsonwebtoken';

export const logout = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: false,
            sameSite: "None",
            'none' : 'strict',
          });
        
          return res.json({succes:true,
            message:"Logged Out"
          })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Something went wrong. Please try again later.' });
  
    }

  }