# Inventario de Cómputo

Sistema web para la administración del inventario de equipos de cómputo. CRUD completo con registro, edición, eliminación y consulta de equipos, categorizados por tipo, estado y ubicación.

## Stack

![Node](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker)

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/)
- O, para desarrollo local: Node.js 22+ y MySQL 8.4

## Inicio rápido (con Docker)

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd inventario-computo

# 2. Levantar todos los servicios
docker-compose up --build
```

Esto inicia:
- **MySQL 8.4** en `localhost:3307` (distinto a tu MySQL local para no interferir)
- **Backend** (Express) en `http://localhost:4000`
- **Frontend** (React + Nginx) en `http://localhost:5173`

La base de datos se inicializa automáticamente con el esquema y datos de ejemplo.

### Detener

```bash
docker-compose down
```

Para eliminar también los datos de la BD:
```bash
docker-compose down -v
```

## Desarrollo local (sin Docker)

### Backend

```bash
cd backend
cp .env.example .env   # Configurar credenciales MySQL
npm install
npm run dev            # node --watch src/app.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev            # Vite dev server :5173
```

### Base de datos

Ejecutar los scripts SQL en orden:

```bash
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql
```

## API REST

| Método | Endpoint             | Descripción              |
|--------|----------------------|--------------------------|
| GET    | /api/equipos         | Listar todos los equipos |
| GET    | /api/equipos/:id     | Obtener un equipo        |
| POST   | /api/equipos         | Crear un equipo          |
| PUT    | /api/equipos/:id     | Actualizar un equipo     |
| DELETE | /api/equipos/:id     | Eliminar un equipo       |
| GET    | /api/categorias      | Listar categorías        |
| GET    | /api/estados         | Listar estados           |
| GET    | /api/ubicaciones     | Listar ubicaciones       |

## Estructura

```
inventario-computo/
├── docker-compose.yml      # Orquestación Docker
├── backend/
│   ├── Dockerfile
│   ├── database/
│   │   ├── schema.sql      # Creación de BD y tablas
│   │   └── seed.sql        # Datos de ejemplo
│   └── src/
│       ├── app.js
│       ├── config/db.js
│       ├── controllers/
│       ├── routes/
│       └── middlewares/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf          # Proxy reverso para producción
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── docs/
    └── Documento_Explicativo_Inventario_Computo.docx
```

## Modelo de datos

- **categorias** — Clasificación de equipos (ej. Laptop, Desktop, Impresora)
- **estados** — Condición del equipo (ej. Operativo, En reparación, Dado de baja)
- **ubicaciones** — Lugar físico donde se encuentra el equipo
- **equipos** — Registro individual con FK a las tres tablas anteriores

## Autor

**Jorge** — Estudiante de Ingeniería de Sistemas  
Universidad de la Costa (CUC), Barranquilla, Colombia
