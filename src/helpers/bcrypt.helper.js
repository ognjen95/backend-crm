const bcrypt = require('bcrypt');
const salt = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(plainPassword, salt));
  });
};

module.exports = {
  hashPassword,
};
