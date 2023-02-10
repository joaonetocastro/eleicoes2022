const express = require('express');
const { getByCandidates } = require('./controllers/candidates');
const { getByCities, getCitiesList } = require('./controllers/cities');
const { getByRoles, getRolesList } = require('./controllers/roles');

const server = express();
server.use(express.static('../../client'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/api/candidates', getByCandidates);
server.get('/api/cities', getByCities);
server.get('/api/roles', getByRoles);
server.get('/api/list/cities', getCitiesList);
server.get('/api/list/roles', getRolesList);

server.listen(8080, () => console.log("Server listening at localhost:8080"));
