const express = require('express');
const { insertUser } = require('../model/user/User.model');
const router = express.Router();
const { hashPassword } = require('../helpers/bcrypt.helper');

router.all('/', (req, res, next) => {
  //   res.json({ message: 'User router' });
  next();
});

router.post('/', async (req, res) => {
  const { name, company, adress, phone, email, password } = req.body;
  try {
    const hashedPassoword = await hashPassword(password);
    const newUserObj = {
      name,
      company,
      adress,
      phone,
      email,
      password: hashedPassoword,
    };

    const result = await insertUser(newUserObj);
    console.log(result);
    res.json({ message: 'New user created', result });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
});

module.exports = router;
