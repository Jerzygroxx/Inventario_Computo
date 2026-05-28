const { Router } = require('express');
const controller = require('../controllers/dashboard.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', authMiddleware, controller.stats);

module.exports = router;
