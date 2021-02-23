const { ResetPinSchema } = require('./ResetPin.schema');

const setPasswordResetPin = (email) => {
  return new Promise((resolve, reject) => {
    const pin = Math.floor(100000 + Math.random() * 900000);

    const resetObj = {
      email: email,
      pin: pin,
    };

    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .then((err) => reject(err));
  });
};

module.exports = { setPasswordResetPin };
