const token = require("../utils");
const Errors = require("http-errors");

const authorization = () => {
  return async (req, res, next) => {
    const [bearer, userToken] = req.headers.authorization.split(" ");
    if (!bearer && !userToken) {
      throw new Errors.Unauthorized("not authorization");
    }
    try {
      token.verify(userToken);
    } catch (error) {
      console.log("=======>", userToken);
      throw new Errors.Unauthorized("not authorization");
    }
    next();
  };
};

module.exports = authorization;
