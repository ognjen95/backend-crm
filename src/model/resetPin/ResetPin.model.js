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
      .catch((err) => reject(err));
  });
};

const checkEmailAndPin = (email, pin) => {
  return new Promise((resolve, reject) => {
    try {
      ResetPinSchema.findOne({ email, pin }, (err, data) => {
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

const deletePin = (email, pin) => {
  try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setPasswordResetPin, checkEmailAndPin, deletePin };
