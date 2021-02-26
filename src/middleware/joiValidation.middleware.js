const Joi = require('joi');

const email = Joi.string().email({
  minDomainSegments: 2,
});

const pin = Joi.string().min(6).max(6).required();
const newPassword = Joi.string().min(8).max(100).required();
const drzava = Joi.string().min(2).max(50).required();
const prodavac = Joi.string().min(2).max(50).required();
const oblasti = Joi.string().min(2).max(50).required();
const prioritet = Joi.string().min(2).max(50).required();
const cc = Joi.array();
const ticket = Joi.string().min(1).max(2000).required();
const napomena = Joi.string().max(1000);
const ime = Joi.string().min(2).max(50);
const broj = Joi.number();
const message = Joi.string().min(1).max(2000).required();
const vin = Joi.string().min(17).max(17);

////////////////////////////////////

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

const createNewTicketValidation = (req, res, next) => {
  const schema = Joi.object({
    drzava,
    prodavac,
    oblasti,
    prioritet,
    cc,
    ticket,
    napomena,
    ime,
    broj,
    email,
    vin,
  });

  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};

const replyMessageValidation = (req, res, next) => {
  const schema = Joi.object({
    message,
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};
module.exports = {
  resetPasswordValidation,
  updatePasswordValidation,
  createNewTicketValidation,
  replyMessageValidation,
};
