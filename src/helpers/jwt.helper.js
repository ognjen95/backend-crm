const jwt = require('jsonwebtoken');

const createAccessJWT = (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });

  return Promise.resolve(accessJWT);
};

const createRefrestJWT = (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_PROCESS_SECRET, {
    expiresIn: '30d',
  });

  return Promise.resolve(refreshJWT);
};

module.exports = { createAccessJWT, createRefrestJWT };
