const express = require('express');
const sqlite = require('sqlite3');
const queries = require('./queries');
const verifyData = require('./middlewares/verifyData');

const db = new sqlite.Database('./database/eleicoes2022-pi.db');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post("/candidate", verifyData, async (req, res) => {
  res.send(await queries.searchByCandidate(db, req.body.searchWord));
});

server.post("/role", verifyData, async (req, res) => {
  res.send(await queries.searchByRole(db, req.body.searchWord));
});

server.post("/city", verifyData, async (req, res) => {
  res.send(await queries.searchByCity(db, req.body.searchWord));
});

server.post("/general", verifyData, async (req, res) => {
  res.send(await queries.searchByAll(db, req.body.searchWord));
});

server.get("/list/:type", async (req, res) => {
  const type = req.params.type.toLowerCase();
  const listType = ["candidato", "cargo", "municipio"];

  if (!listType.includes(type)) {
    return res.send({ error: "search not allowed" });
  }
  res.send(await queries.getAllData(db, type));
});

server.get("*", (req, res) => {
  res.send({ error: "router not found" });
});

server.listen(8080, () => console.log("Server listening at localhost:8080"));