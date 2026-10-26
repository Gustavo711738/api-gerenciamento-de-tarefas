const express = require('express');

const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar tarefas
 */
router.get(
    '/',
    taskController.listar
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Buscar tarefa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

router.get(
    '/:id',
    taskController.buscarPorId
);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       401:
 *         description: Não autorizado
 */

router.post(
    '/',
    taskController.criar
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 */

router.put(
    '/:id',
    taskController.atualizar
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Excluir tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

router.delete(
    '/:id',
    taskController.excluir
);

module.exports = router;