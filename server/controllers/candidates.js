const db = require('../db');

const getByCandidates = (req, res) => {
  return new Promise(function () {
    const { search, status } = req.query;
    const queryStatus = `cand_status = ${!!status ? status : 0}`;
    const queryName = `cand_nome LIKE '${!!search ? search.toUpperCase() : '%%'}'`;
    const query = `SELECT * FROM votos_cand_estado WHERE ${queryStatus} AND ${queryName} ORDER BY cand_nome`;

    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      res.send(rows);
    });
  });
}

module.exports = {
  getByCandidates,
}