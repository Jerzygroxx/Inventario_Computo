const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

const MAX_RETRIES = 10;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function initDatabase() {
  const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
  const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
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
      return;
    } catch (err) {
      const isConnectionError = err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ER_ACCESS_DENIED_ERROR';

      if (isConnectionError && attempt < MAX_RETRIES) {
        const delayMs = Math.pow(2, attempt - 1) * 1000;
        console.warn(`Intento ${attempt}/${MAX_RETRIES}: No se pudo conectar a MySQL. Reintentando en ${delayMs / 1000}s...`);
        await wait(delayMs);
      } else if (isConnectionError) {
        console.error(`No se pudo conectar a la base de datos después de ${MAX_RETRIES} intentos. Abortando.`);
        process.exit(1);
      } else {
        console.error('Error inicializando base de datos:', err.message);
        return;
      }
    }
  }
}

module.exports = initDatabase;