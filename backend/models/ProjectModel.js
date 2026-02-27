import pool from '../db.js';

const ProjectModel = {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );
    return rows;
  },

  async findFeatured() {
    const { rows } = await pool.query(
      `SELECT * FROM projects WHERE featured = TRUE ORDER BY created_at DESC`
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM projects WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create({ name, description, body, tags, url, github_url, cover_url, featured }) {
    const { rows } = await pool.query(
      `INSERT INTO projects
        (name, description, body, tags, url, github_url, cover_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, description, body, tags, url, github_url, cover_url, featured]
    );
    return rows[0];
  },

  async update(id, { name, description, body, tags, url, github_url, cover_url, featured }) {
    const { rows } = await pool.query(
      `UPDATE projects
       SET name=$1, description=$2, body=$3, tags=$4,
           url=$5, github_url=$6, cover_url=$7, featured=$8
       WHERE id=$9
       RETURNING *`,
      [name, description, body, tags, url, github_url, cover_url, featured, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
  },
};

export default ProjectModel;