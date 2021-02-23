const { UserSchema } = require('./User.schema');

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .then((err) => reject(err));
  });
};

const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false;

    try {
      UserSchema.findOne({ _id }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }).select('-password');
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return false;

    try {
      UserSchema.findOne({ email }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const savePin = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .then((err) => reject(err));
  });
};
module.exports = { insertUser, getUserByEmail, getUserById };
