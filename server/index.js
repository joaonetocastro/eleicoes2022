const http = require('http');
const url = require("url");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const reqUrl = url.parse(req.url).pathname;

  switch (reqUrl) {
    case '/candidate':
      res.write("/candidate");
      res.end();
      break;

    case '/role':
      res.write("/role");
      res.end();
      break;

    case '/city':
      res.write("/city");
      res.end();
      break;

    case '/general':
      res.write("/general");
      res.end();
      break;

    default:
      res.write("/");
      res.end();
      break;
  }
});

server.listen(8080, () => console.log('Server listening at localhost:8080'));