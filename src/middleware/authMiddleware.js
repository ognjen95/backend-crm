const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../model/user/User.model');

let protect = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      req.user = await getUserByEmail(decoded.email);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Forbidden' });
      throw new Error('Not authorized, token failed ');
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Forbidden' });
    throw new Error('Not authorized, no token');
  }
};

module.exports = protect;
