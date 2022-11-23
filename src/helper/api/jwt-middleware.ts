const jwt = require('jsonwebtoken');

const util = require('util');

export default jwtMiddleware;

function jwtMiddleware(req, res) {
  try {
    const token = req.headers['authorization'];
    console.log(token)
    if (token == undefined || token.length <= 0) {
      res.status(401).json({
        status: 401,
        message: 'YOU ARE NOT AUTHORIZED',
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userToken;
    console.log(decoded);
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'YOU ARE NOT AUTHORIZED',
    });
  }
}
