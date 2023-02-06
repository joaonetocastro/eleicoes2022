const sqlite = require('sqlite3');
const db = new sqlite.Database('./database/eleicoes2022-pi.db');

module.exports = db;