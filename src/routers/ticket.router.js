const express = require('express');
const router = express.Router();
const { insertTicket, getTickets } = require('../model/ticket/ticket.model');
const protect = require('../middleware/authMiddleware');

router.all('/', (req, res, next) => {
  // res.json({ message: 'Ticket router' });

  next();
});

//create new ticket, proteccted
router.post('/', protect, async (req, res) => {
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

    const user = req.user; // from middleware

    const ticketObj = {
      userId: req.user._id,
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
      conversation: [{ sender: user.name, message: ticket }],
    };

    console.log(req.user);

    const savedTicket = await insertTicket(ticketObj);

    if (savedTicket._id)
      return res.json({ status: '200', msg: 'New ticket created !' });

    res.json({
      status: 'error',
      msg: 'Unable to create ticket, please try again later',
    });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

//get all tickets , proteccted
router.get('/', protect, async (req, res) => {
  try {
    const user = req.user; // from middleware

    const allTickets = await getTickets(user._id);

    res.json({ result: allTickets });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

module.exports = router;
