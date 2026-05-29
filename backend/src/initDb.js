const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

const RETRIES = 30;
const DELAY_MS = 2000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function initDatabase() {
  let lastError;

  for (let attempt = 1; attempt <= RETRIES; attempt++) {
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
      return;
    } catch (err) {
      lastError = err;
      if (err.code === 'ECONNREFUSED') {
        console.log(`Esperando MySQL... (intento ${attempt}/${RETRIES})`);
        await sleep(DELAY_MS);
      } else {
        console.error('Error inicializando base de datos:', err.message);
        return;
      }
    }
  }

  console.error(`No se pudo conectar a MySQL tras ${RETRIES} intentos.`);
  process.exit(1);
}

module.exports = initDatabase;