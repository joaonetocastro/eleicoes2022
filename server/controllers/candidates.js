const db = require('../db');

const getByCandidates = (req, res) => {
  return new Promise(function () {
    const { search, status } = req.query;
    const queryStatus = `cand_status LIKE '${!!status ? status : '%%'}'`;
    const queryName = `cand_nome LIKE '${!!search ? search.toUpperCase() : '%%'}'`;
    const query = `SELECT * FROM votos_cand_estado WHERE ${queryStatus} AND ${queryName} ORDER BY cand_nome`;

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
  getByCandidates,
}