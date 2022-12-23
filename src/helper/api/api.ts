/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
import errorHandler from '@/helper/api/error-handler';
import jwtMiddleware from '@/helper/api/jwt-middleware';

const jwt = require('jsonwebtoken');

function apiHandler(handler) {
  return async (req, res) => {
    try {
      // global middleware
      await jwtMiddleware(req, res, handler);
    } catch (err) {
      // global error handler
      return errorHandler(err, res);
    }
  };
}

export function ExtractJWT(req) {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userToken;
    return decoded;
  } catch (err) {
    return false;
  }
}

export default apiHandler;
