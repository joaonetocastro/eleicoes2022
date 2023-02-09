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

      const data = rows.map((row) => {
        return {
          id: row.cand_id,
          name: row.cand_nome,
          role: row.cargo_nome,
          status: row.cand_status === 1 ? 'elected' : 'not elected',
          votes: row.cand_votos
        }
      });

      res.send(data);
    });
  });
}

module.exports = {
  getCitiesList,
  getByCities,
}