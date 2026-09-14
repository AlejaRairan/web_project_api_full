const jwt = require("jsonwebtoken");
const { JWT_SECRET = 'secret-key' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new UnauthorizedError('Se requiere autenticación'));
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Token inválido'));
  }
};

module.exports = auth;
