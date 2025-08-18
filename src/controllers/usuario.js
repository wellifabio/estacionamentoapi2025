const { PrismaClient } = require('@prisma/client');
const jsonwebtoken = require("jsonwebtoken");
const Middlewares = require('../middleware/auth');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                email: email,
            }
        });

        if (!usuario) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos!' });
        } else {
            const isValidsenha = await Middlewares.validatePassword(senha, usuario.senha);
            if (!isValidsenha) {
                return res.status(401).json({ message: 'E-mail ou senha incorretos!' }).end();
            }
            const token = jsonwebtoken.sign(
                {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "30min" }
            );
            res.status(200).json({ token: token });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
    }
};

const read = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
}

const create = async (req, res) => {
    try {
        req.body.senha = await Middlewares.createHash(req.body.senha);
        const usuario = await prisma.usuario.create({
            data: req.body
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuario', details: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(202).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuario', details: error.message });
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.usuario.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuario', details: error.message });
    }
}

module.exports = {
    login,
    read,
    create,
    update,
    del
};