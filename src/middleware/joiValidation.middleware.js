const Joi = require('joi');

const email = Joi.string().email({
  minDomainSegments: 2,
});

const pin = Joi.string().min(6).max(6).required();

const newPassword = Joi.string().min(8).max(100).required();

const resetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({ email });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};

const updatePasswordValidation = (req, res, next) => {
  const schema = Joi.object({ email, pin, newPassword });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};

module.exports = {
  resetPasswordValidation,
  updatePasswordValidation,
};
