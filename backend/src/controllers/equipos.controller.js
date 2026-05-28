const pool = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const { search, categoria, estado, ubicacion } = req.query;

    let sql = `SELECT e.*, c.nombre AS categoria, es.nombre AS estado, u.nombre AS ubicacion
               FROM equipos e
               JOIN categorias c ON e.id_categoria = c.id
               JOIN estados es ON e.id_estado = es.id
               JOIN ubicaciones u ON e.id_ubicacion = u.id
               WHERE 1=1`;
    const params = [];

    if (search) {
      sql += ' AND (e.nombre LIKE ? OR e.marca LIKE ? OR e.modelo LIKE ? OR e.numero_serie LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }
    if (categoria) {
      sql += ' AND e.id_categoria = ?';
      params.push(Number(categoria));
    }
    if (estado) {
      sql += ' AND e.id_estado = ?';
      params.push(Number(estado));
    }
    if (ubicacion) {
      sql += ' AND e.id_ubicacion = ?';
      params.push(Number(ubicacion));
    }

    sql += ' ORDER BY e.id DESC';

    const [rows] = await pool.query(sql, params);
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
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre del equipo es obligatorio' });
    }
    const [result] = await pool.query(
      `INSERT INTO equipos (nombre, marca, modelo, numero_serie, fecha_adquisicion, observaciones, id_categoria, id_estado, id_ubicacion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre.trim(), marca, modelo, numero_serie, fecha_adquisicion || null, observaciones, id_categoria, id_estado, id_ubicacion]
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
