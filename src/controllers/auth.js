import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { generateToken } from '../utils/jwt.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [rows] = await pool.query(
      'SELECT id, password, role FROM users WHERE username = ? AND status = 1', 
      [username]
    );
    
    const user = rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, email, role = 'user' } = req.body;
    console.log("🚀 ~ register ~ req.body:", req.body)
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🚀 ~ register ~ hashedPassword:", hashedPassword)
    
    await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, role]
    );
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};