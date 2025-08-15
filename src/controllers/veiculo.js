const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        if (req.params.placa) {
            const veiculo = await prisma.veiculo.findUnique({
                where: { placa: req.params.placa },
                include: { estadias: true }
            });
            res.json(veiculo).end();
        }
        else {
            const veiculos = await prisma.veiculo.findMany();
            res.json(veiculos).end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar veiculos' });
    }
}

const create = async (req, res) => {
    try {
        const veiculo = await prisma.veiculo.create({
            data: req.body
        });
        res.status(201).json(veiculo).end();
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar veiculo, verifique se a placa não está duplicada', error: error.message }).end();
    }
}

const update = async (req, res) => {
    const { placa } = req.params;
    try {
        const veiculo = await prisma.veiculo.update({
            where: { placa: placa },
            data: req.body
        });
        res.status(202).json(veiculo);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao atualizar veiculo', error: error.message });
    }
}

const del = async (req, res) => {
    const { placa } = req.params;
    try {
        await prisma.veiculo.delete({
            where: { placa: placa }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar veiculo' });
    }
}

module.exports = {
    read,
    create,
    update,
    del
};