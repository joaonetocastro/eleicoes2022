const {db} = require('../db')

const getCandidatos = (req, res) => {
  const query = `
    SELECT 
    c.*, tc.nome as nome_tipo, cg.nome as nome_cargo 
    FROM candidato c 
    INNER JOIN tipo_candidato tc on tc.id = c.tipo
    INNER JOIN cargo cg on cg.id = c.cargo
  `;

  return new Promise(function (resolve, reject) {
    db.all(query, async (err, rows) => {
      if (err) {
        res.status(500).send({message: err.message});
        return
      }
      res.send(rows);
    });
  });
}

module.exports = {
  getCandidatos
}