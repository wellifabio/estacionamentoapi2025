const express = require('express');
const routes = express.Router();

const veiculo = require('./controllers/veiculo');

routes.get('/', (req, res) => {
    res.json({ titulo: 'API Estacionamento', version: '1.0.0' });
});

routes.get('/veiculos', veiculo.read);
routes.get('/veiculos/:placa', veiculo.read);
routes.post('/veiculos', veiculo.create);
routes.patch('/veiculos/:placa', veiculo.update);
routes.delete('/veiculos/:placa', veiculo.del);

module.exports = routes;