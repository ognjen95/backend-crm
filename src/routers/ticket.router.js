const express = require('express');
const { insertTicket } = require('../model/ticket/ticket.model');
const router = express.Router();

router.all('/', (req, res, next) => {
  // res.json({ message: 'Ticket router' });

  next();
});

router.post('/', async (req, res) => {
  try {
    const {
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
    } = req.body;

    const ticketObj = {
      userId: '60368f630a1d5e3a00455d1d',
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
      conversation: [{ sender: 'Operater', message: ticket }],
    };

    const savedTicket = await insertTicket(ticketObj);

    if (savedTicket._id)
      return res.json({ status: '200', msg: 'New ticket created !' });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

module.exports = router;
