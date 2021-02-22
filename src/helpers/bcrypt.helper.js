const bcrypt = require('bcrypt');
const salt = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(plainPassword, salt));
  });
};
const comparePasswords = (plainPass, dbHashedPass) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, dbHashedPass, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};
module.exports = {
  hashPassword,
  comparePasswords,
};
