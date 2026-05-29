const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');

    const schema = fs.readFileSync(schemaPath, 'utf8');
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const stmt of statements) {
      await pool.query(stmt);
    }

    const seed = fs.readFileSync(seedPath, 'utf8');
    const seedStatements = seed
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const stmt of seedStatements) {
      await pool.query(stmt);
    }

    console.log('Base de datos inicializada correctamente');
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.error('No se pudo conectar a la base de datos. Verifica que MySQL esté corriendo.');
      process.exit(1);
    }
    console.error('Error inicializando base de datos:', err.message);
  }
}

module.exports = initDatabase;