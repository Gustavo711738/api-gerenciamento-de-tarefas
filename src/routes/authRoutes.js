const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */

router.post(
    '/register',
    authController.register
);

router.post(
    '/login',
    authController.login
);

module.exports = router;