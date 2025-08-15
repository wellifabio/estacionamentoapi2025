const express = require('express');
const routes = express.Router();

const Veiculo = require('./controllers/veiculo');
const Estadia = require('./controllers/estadia');

routes.get('/', (req, res) => {
    res.json({ titulo: 'API Estacionamento', version: '1.0.0' });
});

routes.get('/veiculos', Veiculo.read);
routes.get('/veiculos/:placa', Veiculo.read);
routes.post('/veiculos', Veiculo.create);
routes.patch('/veiculos/:placa', Veiculo.update);
routes.delete('/veiculos/:placa', Veiculo.del);

routes.get('/estadias', Estadia.read);
routes.get('/estadias/:placa', Estadia.read);
routes.post('/estadias', Estadia.create);
routes.patch('/estadias/:id', Estadia.update);
routes.delete('/estadias/:id', Estadia.del);

module.exports = routes;