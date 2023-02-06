const {db} = require('../db')

const getCandidatos = (req, res) => {
  let where = 'WHERE'

  if(req.query.cargo) {
    where += ` c.cargo = ${req.query.cargo}`
  }

  const query = `
    SELECT 
    c.*, tc.nome as nome_tipo, cg.nome as nome_cargo, count(v.candidato) as quantidade_de_votos
    FROM candidato c 
    INNER JOIN tipo_candidato tc on tc.id = c.tipo
    INNER JOIN cargo cg on cg.id = c.cargo
    LEFT JOIN votacao v on v.candidato = c.id
    ${where !== 'WHERE' ? where : ''}
    GROUP BY c.id
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