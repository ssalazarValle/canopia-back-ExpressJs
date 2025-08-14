import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (userId, role) => {
  const token = jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '5m' });
  
  const decoded = jwt.decode(token);
  
  return {
    token, 
    expiresAt: decoded.exp, 
    expiresIn: '5m'
  };
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const getTokenExpiration = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) return null;
  
  return {
    expiresAt: new Date(decoded.exp * 1000),
    secondsRemaining: Math.max(0, decoded.exp - Math.floor(Date.now() / 1000))
  };
};