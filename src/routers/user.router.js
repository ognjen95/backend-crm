const express = require('express');
const { insertUser, getUserByEmail } = require('../model/user/User.model');
const router = express.Router();
const { hashPassword, comparePasswords } = require('../helpers/bcrypt.helper');
const { UserSchema } = require('../model/user/User.schema');

router.all('/', (req, res, next) => {
  //   res.json({ message: 'User router' });
  next();
});

// sing up user
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

// sing in user

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: 'Error', message: 'Invalid form submission' });
  }

  const user = await getUserByEmail(email);

  console.log(user);

  const passwordFromDb = user && user._id ? user.password : null;

  if (!passwordFromDb)
    return res.json({ status: 'error', message: 'Invalid Email or Password' });

  const result = await comparePasswords(password, passwordFromDb);

  res.json({ status: 'success', message: 'Login Success' });
});

module.exports = router;
