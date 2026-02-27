import pool from '../db.js';

const PostModel = {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    return rows;
  },

  async findPublished() {
    const { rows } = await pool.query(
      `SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC`
    );
    return rows;
  },

  async findLatestPublished(limit = 3) {
    const { rows } = await pool.query(
      `SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT $1`,
      [limit]
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create({ title, body, excerpt, status, tags, cover_url, ai_generated, scheduled_at }) {
    const { rows } = await pool.query(
      `INSERT INTO posts
        (title, body, excerpt, status, tags, cover_url, ai_generated, scheduled_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, body, excerpt, status, tags, cover_url, ai_generated, scheduled_at]
    );
    return rows[0];
  },

  async update(id, { title, body, excerpt, status, tags, cover_url, scheduled_at }) {
    const { rows } = await pool.query(
      `UPDATE posts
       SET title=$1, body=$2, excerpt=$3, status=$4,
           tags=$5, cover_url=$6, scheduled_at=$7
       WHERE id=$8
       RETURNING *`,
      [title, body, excerpt, status, tags, cover_url, scheduled_at, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  },

  async findScheduled() {
    const { rows } = await pool.query(
      `SELECT * FROM posts
       WHERE status = 'scheduled' AND scheduled_at <= NOW()`
    );
    return rows;
  },

  async publish(id) {
    const { rows } = await pool.query(
      `UPDATE posts
       SET status='published', published_at=NOW()
       WHERE id=$1
       RETURNING *`,
      [id]
    );
    return rows[0];
  },
};

export default PostModel;