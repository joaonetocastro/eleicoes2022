const http = require("http");
const url = require("url");
const sqlite = require("sqlite3");
const queries = require("./queries");
const db = new sqlite.Database('./database/eleicoes2022-pi.db');

function jsonResponse(response, data) {
  response.writeHead(200);
  response.end(JSON.stringify(data, null, 3));
  return response;
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const parsed = url.parse(req.url, true);
  const reqUrl = parsed.pathname;
  const query = parsed.query;

  switch (reqUrl) {
    case '/candidate':
      jsonResponse(res, await queries.searchByCandidate(db, query.keyword));
      break;

    case '/role':
      jsonResponse(res, await queries.searchByRole(db, query.keyword));
      break;

    case '/city':
      res.writeHead(200);
      jsonResponse(res, await queries.searchByCity(db, query.keyword));
      break;

    case '/general':
      res.writeHead(200);
      jsonResponse(res, await queries.searchByAll(db, query.keyword));
      break;

    default:
      res.writeHead(200);
      res.end(JSON.stringify({ error: "route not found" }, null));
      break;
  }
});

server.listen(8080, () => console.log('Server listening at localhost:8080'));