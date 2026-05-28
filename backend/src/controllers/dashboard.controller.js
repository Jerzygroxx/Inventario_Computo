const pool = require('../config/db');

exports.stats = async (req, res, next) => {
  try {
    const [total] = await pool.query('SELECT COUNT(*) AS total FROM equipos');
    const [porEstado] = await pool.query(
      `SELECT es.nombre, COUNT(*) AS cantidad
       FROM equipos e JOIN estados es ON e.id_estado = es.id
       GROUP BY es.nombre ORDER BY cantidad DESC`
    );
    const [porCategoria] = await pool.query(
      `SELECT c.nombre, COUNT(*) AS cantidad
       FROM equipos e JOIN categorias c ON e.id_categoria = c.id
       GROUP BY c.nombre ORDER BY cantidad DESC`
    );
    const [ultimos] = await pool.query(
      `SELECT e.*, c.nombre AS categoria, es.nombre AS estado, u.nombre AS ubicacion
       FROM equipos e
       JOIN categorias c ON e.id_categoria = c.id
       JOIN estados es ON e.id_estado = es.id
       JOIN ubicaciones u ON e.id_ubicacion = u.id
       ORDER BY e.created_at DESC LIMIT 5`
    );

    res.json({ total: total[0].total, porEstado, porCategoria, ultimos });
  } catch (err) {
    next(err);
  }
};
