const express = require('express');
const { getCandidatos, searchCandidatos } = require('./controllers/candidatos');
const { getCargos, searchCargos } = require('./controllers/cargos');
const { getMunicipios, searchMunicipios } = require('./controllers/municipios');
const verifyData = require('./middlewares/verifyData');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/candidatos', getCandidatos);
server.post('/candidatos', searchCandidatos, verifyData);

server.get('/municipios', getMunicipios);
server.post('/municipios', searchMunicipios, verifyData);

server.get('/cargos', getCargos);
server.post('/cargos', searchCargos, verifyData);

server.listen(8080, () => console.log("Server listening at localhost:8080"));