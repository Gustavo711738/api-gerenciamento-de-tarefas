const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class AuthController {

    async register(req, res) {

        try {

            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    erro: 'Todos os campos são obrigatórios'
                });
            }

            const usuarioExiste = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (usuarioExiste) {
                return res.status(400).json({
                    erro: 'Email já cadastrado'
                });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const usuario = await prisma.user.create({
                data: {
                    nome,
                    email,
                    senha: senhaHash
                }
            });

            return res.status(201).json({
                mensagem: 'Usuário criado com sucesso',
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

    async login(req, res) {

        try {

            const { email, senha } = req.body;

            const usuario = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (!usuario) {
                return res.status(401).json({
                    erro: 'Credenciais inválidas'
                });
            }

            const senhaValida = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaValida) {
                return res.status(401).json({
                    erro: 'Credenciais inválidas'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).json({
                token
            });

        } catch (error) {

            return res.status(500).json({
                erro: error.message
            });

        }

    }

}

module.exports = new AuthController();