const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuario');
const Middleware = require('./middleware/auth');
const Veiculo = require('./controllers/veiculo');
const Estadia = require('./controllers/estadia');

routes.get('/', (req, res) => {
    const api = {
        titulo: 'API Estacionamento',
        versao: '1.0.0',
        rotas: [
            { metodo: 'POST', caminho: '/login' },
            { metodo: 'POST', caminho: '/logado' },
            { metodo: 'GET', caminho: '/usuarios' },
            { metodo: 'GET', caminho: '/usuarios/:id' },
            { metodo: 'POST', caminho: '/usuarios' },
            { metodo: 'PATCH', caminho: '/usuarios/:id' },
            { metodo: 'DELETE', caminho: '/usuarios/:id' },
            { metodo: 'GET', caminho: '/veiculos' },
            { metodo: 'GET', caminho: '/veiculos/:placa' },
            { metodo: 'POST', caminho: '/veiculos' },
            { metodo: 'PATCH', caminho: '/veiculos/:placa' },
            { metodo: 'DELETE', caminho: '/veiculos/:placa' },
            { metodo: 'GET', caminho: '/estadias' },
            { metodo: 'GET', caminho: '/estadias/:placa' },
            { metodo: 'POST', caminho: '/estadias' },
            { metodo: 'PATCH', caminho: '/estadias/:id' },
            { metodo: 'DELETE', caminho: '/estadias/:id' }
        ]
    }
    res.json(api);
});

routes.post('/login', Usuario.login);
routes.post('/logado', Middleware.validaToken);
routes.get('/usuarios', Middleware.validate, Usuario.read);
routes.get('/usuarios/:id', Usuario.read);
routes.post('/usuarios', Usuario.create);
routes.patch('/usuarios/:id', Middleware.validate, Usuario.update);
routes.delete('/usuarios/:id', Middleware.validate, Usuario.del);

routes.get('/veiculos', Middleware.validate, Veiculo.read);
routes.get('/veiculos/:placa', Middleware.validate, Veiculo.read);
routes.post('/veiculos', Middleware.validate, Veiculo.create);
routes.patch('/veiculos/:placa', Middleware.validate, Veiculo.update);
routes.delete('/veiculos/:placa', Middleware.validate, Veiculo.del);

routes.get('/estadias', Middleware.validate, Estadia.read);
routes.get('/estadias/:placa', Middleware.validate, Estadia.read);
routes.post('/estadias', Middleware.validate, Estadia.create);
routes.patch('/estadias/:id', Middleware.validate, Estadia.update);
routes.delete('/estadias/:id', Middleware.validate, Estadia.del);

module.exports = routes;