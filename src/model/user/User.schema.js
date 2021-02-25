const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  operater: { type: Boolean, default: false },
  sales: { type: Boolean, default: false },
  afterSales: { type: Boolean, default: false },
  service: { type: Boolean, default: false },
});

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  userRole: [UserRoleSchema],
  isAdmin: { type: Boolean, required: true, default: false },
  company: { type: String, maxlength: 50, required: true },
  adress: { type: String, maxlength: 50 },
  phone: { type: Number, maxlength: 20 },
  email: { type: String, maxlength: 50, required: true },
  password: { type: String, maxlength: 100, minlength: 8, required: true },
});

module.exports = {
  UserSchema: mongoose.model('User', UserSchema),
};
