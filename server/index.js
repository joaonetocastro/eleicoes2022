const express = require('express');
const { getByCandidates } = require('./controllers/candidates');
const { getByCities, getCitiesList } = require('./controllers/cities');
const { getByRoles, getRolesList } = require('./controllers/roles');

const server = express();
server.use(express.static('../client'))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/candidates', getByCandidates);
server.get('/cities', getByCities);
server.get('/roles', getByRoles);
server.get('/list/cities', getCitiesList);
server.get('/list/roles', getRolesList);

server.listen(8080, () => console.log("Server listening at localhost:8080"));