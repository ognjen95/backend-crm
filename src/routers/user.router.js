const express = require('express');
const {
  insertUser,
  getUserByEmail,
  getUserById,
} = require('../model/user/User.model');
const router = express.Router();
const { hashPassword, comparePasswords } = require('../helpers/bcrypt.helper');
const { createAccessJWT, createRefrestJWT } = require('../helpers/jwt.helper');
const protect = require('../middleware/authMiddleware');
const { setPasswordResetPin } = require('../model/resetPin/ResetPin.model');
const { emailProcessor } = require('../helpers/email.helper');

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

  const user = await getUserByEmail(email); //get user from dB

  const passwordFromDb = user && user._id ? user.password : null;

  if (!passwordFromDb)
    return res.json({ status: 'error', message: 'Invalid Email or Password' });

  const result = await comparePasswords(password, passwordFromDb);

  if (!result) {
    return res.json({ status: 'Error', message: 'Invalid form submission' });
  }

  const accessJWT = await createAccessJWT(user.email);
  const refreshJWT = await createRefrestJWT(user.email);

  res.json({
    status: 'success',
    message: 'Login Success',
    name: user.name,
    email: user.email,
    accessJWT,
    refreshJWT,
  });
});

// get user Protected

router.get('/profile', protect, async (req, res) => {
  const { _id } = req.user; // forwarded from auth middleware

  const user = await getUserById(_id);
  console.log(user);
  if (user) {
    res.json({ user });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// reset password

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user && !user._id)
      res.json({
        status: 'error',
        Message: 'There is no user with this email',
      });

    const setPin = await setPasswordResetPin(user.email);

    if (!setPin) res.json({ status: 'error', Message: 'Can not send pin' });

    emailProcessor(email, setPin.pin);

    res.json({ msg: 'success', msg: 'Pin sent to Your email adress' });
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'error',
      message: 'We can not send You pin right now, try again later.',
      error: error.message,
    });
  }
});

module.exports = router;
