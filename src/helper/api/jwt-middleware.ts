const jwt = require('jsonwebtoken');

export default jwtMiddleware;

function jwtMiddleware(req, res, handler) {
  try {
    const token = req.headers['authorization'];
    if (token == undefined || token.length <= 0) {
      return res.status(401).json({
        status: 401,
        message: 'YOU ARE NOT AUTHORIZED',
      });
    }
    // route handler
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userToken;
    if (decoded['id']) {
      return handler(req, res);
    }
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'YOU ARE NOT AUTHORIZED',
    });
  }
}
