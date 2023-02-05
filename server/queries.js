async function searchByCandidate(dbConnection, keyword) {
  const sql = `SELECT * FROM votos_cand_estado where cand_nome LIKE '${keyword}%'`;

  return new Promise(function (resolve, reject) {
    let response = [];
    dbConnection.all(sql, async (err, rows) => {
      if (err) {
        reject(err.response);
      }

      response = await rows.map((cand) => {
        return {
          name: cand.cand_nome,
          role: cand.cargo_nome,
          votes: cand.cand_votos,
          status: cand.cand_status == 1 ? "elected" : "not elected",
        }
      });
      resolve(response);
    });
  });
}

async function searchByRole(dbConnection, keyword) {
  const sql = `SELECT * FROM votos_cand_estado where cargo_nome LIKE '${keyword}%'`;

  return new Promise(function (resolve, reject) {
    let response = [];
    dbConnection.all(sql, async (err, rows) => {
      if (err) {
        reject(err.response);
      }

      response = await rows.map((cand) => {
        return {
          name: cand.cand_nome,
          role: cand.cargo_nome,
          votes: cand.cand_votos,
          status: cand.cand_status == 1 ? "elected" : "not elected",
        }
      });
      resolve(response);
    });
  });
}

async function searchByCity(dbConnection, keyword) {
  const sql = `SELECT * FROM votos_cand_municipio where cargo_nome LIKE '${keyword}%'`;

  return new Promise(function (resolve, reject) {
    let response = [];
    dbConnection.all(sql, async (err, rows) => {
      if (err) {
        reject(err.response);
      }

      response = await rows.map((cand) => {
        return {
          name: cand.cand_nome,
          role: cand.cargo_nome,
          votes: cand.cand_votos,
          status: cand.cand_status == 1 ? "elected" : "not elected",
        }
      });
      resolve(response);
    });
  });
}

async function searchByAll(dbConnection, keyword) {
  const sql = `SELECT * FROM votos_cand_estado where cand_status = ${keyword}`;

  return new Promise(function (resolve, reject) {
    let response = [];
    dbConnection.all(sql, async (err, rows) => {
      if (err) {
        reject(err.response);
      }

      response = await rows.map((cand) => {
        return {
          name: cand.cand_nome,
          role: cand.cargo_nome,
          votes: cand.cand_votos,
          status: cand.cand_status == 1 ? "elected" : "not elected",
        }
      });
      resolve(response);
    });
  });
}

module.exports = {
  searchByCandidate,
  searchByRole,
  searchByCity,
  searchByAll,
}