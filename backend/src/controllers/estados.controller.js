const pool = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM estados ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
