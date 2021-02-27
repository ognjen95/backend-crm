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
const {
  createNewTicketValidation,
  replyMessageValidation,
} = require('../middleware/joiValidation.middleware');

router.all('/', (req, res, next) => {
  // res.json({ message: 'Ticket router' });

  next();
});

//create new ticket, proteccted
router.post('/', protect, createNewTicketValidation, async (req, res) => {
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
      // za,
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

    return res.json({ result: allTickets });
  } catch (error) {
    return res.json({
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

    return res.json({ result: ticket });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

//add new message
router.put('/:ticketId', protect, replyMessageValidation, async (req, res) => {
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

    return res.json({ error: 'Could not reply' });
  } catch (error) {
    res.json({
      status: 'error',
      msg: error.message,
    });
  }
});

//Update ticket status closed

router.patch('/close-ticket/:ticketId', protect, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const user = req.user; // from middleware
    const ticket = await getTicketById(ticketId, user._id);

    if (ticket[0].conversation.length < 2)
      return res.json({ status: 'You must answer first to close ticket' });

    if (ticketStatusClosed.status.toLowerCase().trim() === 'zatvoren') {
      return res.json({ status: 'Ticket is already closed' });
    }
    const ticketStatusClosed = await closeTicket(ticketId, user._id);

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
