const pool = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT e.*, c.nombre AS categoria, es.nombre AS estado, u.nombre AS ubicacion
       FROM equipos e
       JOIN categorias c ON e.id_categoria = c.id
       JOIN estados es ON e.id_estado = es.id
       JOIN ubicaciones u ON e.id_ubicacion = u.id
       ORDER BY e.id DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { nombre, marca, modelo, numero_serie, fecha_adquisicion, observaciones, id_categoria, id_estado, id_ubicacion } = req.body;
    const [result] = await pool.query(
      `INSERT INTO equipos (nombre, marca, modelo, numero_serie, fecha_adquisicion, observaciones, id_categoria, id_estado, id_ubicacion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, marca, modelo, numero_serie, fecha_adquisicion || null, observaciones, id_categoria, id_estado, id_ubicacion]
    );
    res.status(201).json({ id: result.insertId, message: 'Equipo creado' });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { nombre, marca, modelo, numero_serie, fecha_adquisicion, observaciones, id_categoria, id_estado, id_ubicacion } = req.body;
    const [result] = await pool.query(
      `UPDATE equipos SET nombre = ?, marca = ?, modelo = ?, numero_serie = ?, fecha_adquisicion = ?, observaciones = ?, id_categoria = ?, id_estado = ?, id_ubicacion = ?
       WHERE id = ?`,
      [nombre, marca, modelo, numero_serie, fecha_adquisicion || null, observaciones, id_categoria, id_estado, id_ubicacion, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json({ message: 'Equipo actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM equipos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json({ message: 'Equipo eliminado' });
  } catch (err) {
    next(err);
  }
};
