const express = require('express');
const cors = require('cors');

const equiposRoutes = require('./routes/equipos.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const estadosRoutes = require('./routes/estados.routes');
const ubicacionesRoutes = require('./routes/ubicaciones.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const errorHandler = require('./middlewares/errorHandler');
const { authMiddleware } = require('./middlewares/auth.middleware');

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

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
