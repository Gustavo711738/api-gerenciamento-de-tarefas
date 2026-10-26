const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class TaskController {

    async listar(req, res) {

        try {

            const tarefas = await prisma.task.findMany({
                where: {
                    userId: req.userId
                }
            });

            return res.status(200).json(tarefas);

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async buscarPorId(req, res) {

        try {

            const { id } = req.params;

            const tarefa = await prisma.task.findFirst({
                where: {
                    id: Number(id),
                    userId: req.userId
                }
            });

            if (!tarefa) {
                return res.status(404).json({
                    erro: 'Tarefa não encontrada'
                });
            }

            return res.status(200).json(tarefa);

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async criar(req, res) {

        try {

            const { titulo, descricao } = req.body;

            if (!titulo) {
                return res.status(400).json({
                    erro: 'Título é obrigatório'
                });
            }

            const tarefa = await prisma.task.create({
                data: {
                    titulo,
                    descricao,
                    userId: req.userId
                }
            });

            return res.status(201).json(tarefa);

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async atualizar(req, res) {

        try {

            const { id } = req.params;

            const { titulo, descricao, status } = req.body;

            const tarefa = await prisma.task.findFirst({
                where: {
                    id: Number(id),
                    userId: req.userId
                }
            });

            if (!tarefa) {
                return res.status(404).json({
                    erro: 'Tarefa não encontrada'
                });
            }

            const tarefaAtualizada = await prisma.task.update({
                where: {
                    id: Number(id)
                },
                data: {
                    titulo,
                    descricao,
                    status
                }
            });

            return res.status(200).json(tarefaAtualizada);

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async excluir(req, res) {

        try {

            const { id } = req.params;

            const tarefa = await prisma.task.findFirst({
                where: {
                    id: Number(id),
                    userId: req.userId
                }
            });

            if (!tarefa) {
                return res.status(404).json({
                    erro: 'Tarefa não encontrada'
                });
            }

            await prisma.task.delete({
                where: {
                    id: Number(id)
                }
            });

            return res.status(204).send();

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

}

module.exports = new TaskController();