const {db} = require('../db')

const getMunicipios = (req, res) => {
  const query = `
    SELECT * from municipio
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
  getMunicipios
}