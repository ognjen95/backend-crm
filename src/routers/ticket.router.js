const express = require('express');
const router = express.Router();
const {
  insertTicket,
  getTickets,
  getTicketById,
  ReplyMessage,
  closeTicket,
  deleteTicket,
} = require('../model/ticket/ticket.model');
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
router.get('/all-tickets', protect, async (req, res) => {
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

//get all tickets , proteccted
router.get('/:ticketId', protect, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const user = req.user; // from middleware

    const ticket = await getTicketById(ticketId, user._id);

    res.json({ result: ticket });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

//add new message
router.put('/:ticketId', protect, async (req, res) => {
  try {
    const { sender, message } = req.body;

    const ticketId = req.params.ticketId;
    const user = req.user;
    const userId = req.user._id; // from middleware

    const ticket = await ReplyMessage({
      ticketId,
      userId,
      message,
      sender: user.name,
    });

    if (ticket._id) {
      return res.json({ status: 'Message added, ticket updated.' });
    }

    res.json({ error: 'Could not reply' });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

//Update ticket status closed

router.patch('/:ticketId', protect, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const user = req.user; // from middleware
    const ticket = await getTicketById(ticketId, user._id);

    console.log(ticket[0].status);
    ticket[0].conversation.length < 2 &&
      res.json({ status: 'You must answer first to close ticket' });

    const ticketStatusClosed = await closeTicket(ticketId, user._id);

    if (ticketStatusClosed.status.toLowerCase().trim() === 'zatvoren') {
      return res.json({ status: 'Ticket is already closed' });
    }

    if (ticketStatusClosed._id) {
      return res.json({ status: 'Ticket is closed sucessfuly' });
    }

    res.json({ error: 'Could not close ticket' });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

//delete ticket

router.delete('/:ticketId', protect, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const user = req.user; // from middleware

    await deleteTicket(ticketId, user._id);

    return res.json({ status: 'Ticket is deleted.' });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});
module.exports = router;
