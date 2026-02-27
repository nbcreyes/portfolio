import pool from '../db.js';

const ContactModel = {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM contacts WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async findUnread() {
    const { rows } = await pool.query(
      'SELECT * FROM contacts WHERE read = FALSE ORDER BY created_at DESC'
    );
    return rows;
  },

  async create({ name, email, message }) {
    const { rows } = await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );
    return rows[0];
  },

  async markRead(id) {
    const { rows } = await pool.query(
      'UPDATE contacts SET read = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
  },
};

export default ContactModel;