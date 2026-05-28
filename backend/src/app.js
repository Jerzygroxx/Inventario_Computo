const express = require('express');
const cors = require('cors');

const equiposRoutes = require('./routes/equipos.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const estadosRoutes = require('./routes/estados.routes');
const ubicacionesRoutes = require('./routes/ubicaciones.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/equipos', equiposRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/ubicaciones', ubicacionesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
