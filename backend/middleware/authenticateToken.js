const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get Token from header

  if(!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { //Verify Token
    if (err) {
      return res.status(403).json({ message: 'Access denied. Invalid token. '});
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;