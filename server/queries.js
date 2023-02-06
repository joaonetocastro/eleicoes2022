async function searchByCandidate(dbConnection, keyword) {
  const sql = `SELECT * FROM votos_cand_estado WHERE cand_nome LIKE '${keyword.toUpperCase()}%'`;

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
  const sql = `SELECT * FROM votos_cand_estado WHERE cargo_nome LIKE '${keyword.toUpperCase()}%'`;

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
  const sql = `SELECT * FROM votos_cand_municipio WHERE muni_nome LIKE '${keyword.toUpperCase()}%'`;

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
  const sql = `SELECT * FROM votos_cand_estado WHERE cand_status = ${keyword.toUpperCase()}`;

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

async function getAllData(dbConnection, type) {
  const sql = `SELECT * FROM ${type.toUpperCase()} ORDER BY nome`;

  return new Promise(function (resolve, reject) {
    let response = [];
    dbConnection.all(sql, async (err, rows) => {
      if (err) {
        reject(err.response);
      }

      response = await rows.map((row) => {
        return {
          name: row.nome,
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
  getAllData,
}