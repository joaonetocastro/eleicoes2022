const express = require('express');
const sqlite = require('sqlite3');
const queries = require('./queries');
const db = new sqlite.Database('./database/eleicoes2022-pi.db');
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post("/candidate", async (req, res) => {
  res.send(await queries.searchByCandidate(db, req.body.keyword));
});

server.post("/role", async (req, res) => {
  res.send(await queries.searchByRole(db, req.body.keyword));
});

server.post("/city", async (req, res) => {
  res.send(await queries.searchByCity(db, req.body.keyword));
});

server.post("/general", async (req, res) => {
  res.send(await queries.searchByAll(db, req.body.keyword));
});

server.get("/list/:type", async (req, res) => {
  const type = req.params.type.toLowerCase();
  const listType = ["candidato", "cargo", "municipio"];

  if (!listType.includes(type)) {
    return res.send({ error: "search not allowed" });
  }
  res.send(await queries.getAllData(db, type));
});

server.listen(8080, () => console.log("Server listening at localhost:8080"));