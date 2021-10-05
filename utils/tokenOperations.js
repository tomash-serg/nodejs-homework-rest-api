const JWT = require("jsonwebtoken");
require("dotenv").config();

const { JWT_KEY } = process.env;

const token = {
  token: null,
  get(email) {
    this.token = JWT.sign({ email }, JWT_KEY, { expiresIn: "3h" });
    return this.token;
  },
  verify(token) {
    return JWT.verify(token, JWT_KEY);
  },
  clear() {
    this.token = null;
    return "";
  },
};

module.exports = token;
