const sqlite = require('sqlite3');
const db = new sqlite.Database('./database/eleicoes2022-pi.db');

const getCandidatos = (req, res) => {
  const query = `SELECT c.*, tc.nome as nome_tipo FROM candidato c INNER JOIN tipo_candidato tc on tc.id = c.tipo`;

  return new Promise(function (resolve, reject) {
    let response = [];
    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({message: err.message});
        return
      }

      // response = rows.map((cand) => {
      //   return {
      //     name: cand.cand_nome,
      //     role: cand.cargo_nome,
      //     votes: cand.cand_votos,
      //     status: cand.cand_status == 1 ? "elected" : "not elected",
      //   }
      // });

      res.send(rows);
    });
  });
}

module.exports = {
  getCandidatos
}