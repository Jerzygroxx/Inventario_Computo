const express = require('express');
const path = require('path');
const cors = require('cors');

const equiposRoutes = require('./routes/equipos.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const estadosRoutes = require('./routes/estados.routes');
const ubicacionesRoutes = require('./routes/ubicaciones.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const errorHandler = require('./middlewares/errorHandler');
const { authMiddleware } = require('./middlewares/auth.middleware');
const initDatabase = require('./initDb');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/equipos', authMiddleware, equiposRoutes);
app.use('/api/categorias', authMiddleware, categoriasRoutes);
app.use('/api/estados', authMiddleware, estadosRoutes);
app.use('/api/ubicaciones', authMiddleware, ubicacionesRoutes);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(publicPath, 'index.html'));
  }
});

app.use(errorHandler);

async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

start();
