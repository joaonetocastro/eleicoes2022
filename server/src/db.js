const sqlite = require('sqlite3');
const path = require('path');

const dbFile = path.join(__dirname, '/database/eleicoes2022-pi.db');
const db = new sqlite.Database(dbFile);

module.exports = db;