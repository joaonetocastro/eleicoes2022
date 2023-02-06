const express = require('express');
const { getCandidates, searchCandidates } = require('./controllers/candidates');
const { getCities, searchCities } = require('./controllers/cities');
const { getRoles, searchRoles } = require('./controllers/roles');
const verifyData = require('./middlewares/verifyData');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/candidates', getCandidates);
server.post('/candidates', searchCandidates, verifyData);

server.get('/cities', getCities);
server.post('/cities', searchCities, verifyData);

server.get('/roles', getRoles);
server.post('/roles', searchRoles, verifyData);

server.listen(8080, () => console.log("Server listening at localhost:8080"));