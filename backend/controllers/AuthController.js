import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import dotenv from 'dotenv';
dotenv.config();

const AuthController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      const user = rows[0];

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async me(req, res) {
    try {
      const { rows } = await pool.query(
        'SELECT id, email, name, bio, avatar_url FROM users WHERE id = $1',
        [req.user.id]
      );
      if (!rows[0]) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async setup(req, res) {
    try {
      const { rows: existing } = await pool.query('SELECT id FROM users LIMIT 1');
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Admin account already exists.' });
      }

      const { email, password, name } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      const { rows } = await pool.query(
        `INSERT INTO users (email, password_hash, name)
         VALUES ($1, $2, $3)
         RETURNING id, email, name`,
        [email, passwordHash, name]
      );

      res.status(201).json({ message: 'Admin account created.', user: rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default AuthController;