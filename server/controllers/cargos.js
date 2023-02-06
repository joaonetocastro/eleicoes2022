const {db} = require('../db')

const getCargos = (req, res) => {
  let where = 'WHERE'

  const query = `
    SELECT * from cargo
    ${where !== 'WHERE' ? where : ''}
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
  getCargos
}