function verifyData (request, response, next) {
  if (!request.body || request.body.search === undefined) {
    response.send({ message: "param 'search' is missing" });
  }

  next();
}

module.exports = verifyData;