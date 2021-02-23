const jwt = require('jsonwebtoken');

const createAccessJWT = (email) => {
  const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30d',
  });

  // await localStorage.setItem('userInfo', JSON.stringify(accessJWT));

  return Promise.resolve(accessJWT);
};

const createRefrestJWT = (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });

  return Promise.resolve(refreshJWT);
};

module.exports = { createAccessJWT, createRefrestJWT };
