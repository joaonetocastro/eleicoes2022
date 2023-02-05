function verifyData (request, response, next) {
  if (!request.body || request.body.keyword === undefined) {
    return response.send({ error: "param 'keyword' is missing" });
  }

  next();
}

module.exports = verifyData;