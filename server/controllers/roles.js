const db = require('../db');

const getRolesList = (req, res) => {
  return new Promise(function () {
    const query = `SELECT * FROM cargo ORDER BY nome`;

    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      res.send(rows);
    });
  });
}

const getByRoles = (req, res) => {
  return new Promise(function () {
    const { search } = req.query;
    const queryRole = `cargo_nome LIKE '${!!search ? search.toUpperCase() : '%%'}'`;
    const query = `SELECT * FROM votos_cand_estado WHERE ${queryRole} ORDER BY cand_nome`;

    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }

      const data = rows.map((row) => {
        return {
          ...row,
          cand_status: row.cand_status === 1 ? 'elected' : 'not elected',
        }
      });

      res.send(data);
    });
  });
}

module.exports = {
  getRolesList,
  getByRoles,
}