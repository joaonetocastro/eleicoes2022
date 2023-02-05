function verifyData (request, response, next) {
  if (!request.body || request.body.searchWord === undefined) {
    return response.send({ error: "param 'searchWord' is missing" });
  }

  next();
}

module.exports = verifyData;