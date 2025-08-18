const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Middleware para validar o token recebendo o token no cabeçalho
const validate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) res.status(401).send({ message: "Access Denied. No token provided." }).end();

    try {
        const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        req.headers['user'] = payload;

        next();
    } catch (err) {
        res.status(500).send(err).end();
    }
}

// Middleware para validar o token recebendo o token no corpo da requisição
const validaToken = (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).send({ message: "Acesso negado. Nenhum token recebido." }).end();
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ valid: false, payload: null }).end();
        }
        res.status(200).json({ valid: true, payload: decoded }).end();
    });
}

//Criar um hash da senha Usado na criação de usuário e no login
const createHash = async (senha) => {
    if (!senha) return null;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
        throw new Error('Erro ao criar hash');
    }
}

//Validar a senha do usuário Usado no login
const validatePassword = async (senha, hash) => {
    if (!senha || !hash) return false;

    try {
        return await bcrypt.compare(senha, hash);
    } catch (error) {
        console.error('Erro ao validar senha:', error);
        throw new Error('Erro ao validar senha');
    }
}

module.exports = {
    validate,
    validaToken,
    createHash,
    validatePassword
};