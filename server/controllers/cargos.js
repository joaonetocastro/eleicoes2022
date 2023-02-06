const db = require('../db');

const getCargos = (req, res) => {
  return new Promise(function () {
    const sql = `SELECT * FROM candidato ORDER BY nome`;
    db.all(sql, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      const data = rows.map((row) => {
        return {
          name: row.nome,
        }
      });

      res.send(data);
    });
  });
}

const searchCargos = (req, res) => {
  if (!req.body.search) {
    res.send({ message: "param 'search' is missing" });
    return;
  }

  return new Promise(function () {
    const query = `SELECT * FROM votos_cand_estado WHERE cand_nome LIKE '${req.body.search.toUpperCase()}%'`;
    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      const data = rows.map((cand) => {
        return {
          name: cand.cand_nome,
          role: cand.cargo_nome,
          votes: cand.cand_votos,
          status: cand.cand_status == 1 ? "elected" : "not elected",
        }
      });

      res.send(data);
    });
  });
}

module.exports = {
  getCargos,
  searchCargos,
}