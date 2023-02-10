const db = require('../db');

const getCitiesList = (req, res) => {
  return new Promise(function () {
    const query = `SELECT * FROM municipio ORDER BY nome`;

    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      res.send(rows);
    });
  });
}

const getByCities = (req, res) => {
  return new Promise(function () {
    const { search } = req.query;
    const queryCity = `muni_nome LIKE '${!!search ? search.toUpperCase() : '%%'}'`;
    const query = `SELECT * FROM votos_cand_municipio WHERE ${queryCity} ORDER BY cand_nome`;

    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      let totalVotes = 0;
      const data = rows.map((row) => {
        totalVotes += row.cand_votos;
        // os campos estão trocados - cand_status, cargo_nome
        return {
          ...row,
          cargo_nome: row.cand_status,
          cand_status: row.cargo_nome === 1 ? 'eleito' : 'não eleito',
        }
      });

      res.send({
        data,
        totalVotes
      });
    });
  });
}

module.exports = {
  getCitiesList,
  getByCities,
}