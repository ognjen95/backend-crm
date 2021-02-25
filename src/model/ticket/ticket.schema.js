const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  drzava: {
    type: String,
    maxlength: 50,
    required: true,
  },
  prodavac: {
    type: String,
    maxlength: 50,
    required: true,
  },
  oblasti: {
    type: String,
    maxlength: 50,
    required: true,
  },
  prioritet: {
    type: String,
    maxlength: 50,
    required: true,
  },
  cc: [
    {
      name: { type: String },
      email: { type: String, required: true, maxlength: 50 },
    },
  ],
  ticket: {
    type: String,
    maxlength: 2000,
    required: true,
  },
  napomena: {
    type: String,
    maxlength: 1000,
  },
  ime: {
    type: String,
    maxlength: 50,
  },
  broj: {
    type: Number,
    maxlength: 20,
  },
  email: {
    type: String,
    maxlength: 50,
  },
  vin: {
    type: String,
    maxlength: 17,
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    default: 'Otvoren',
  },
  conversation: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: '',
      },
      message: {
        type: String,
        maxlength: 2000,
        required: true,
        default: '',
      },
      msgAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

module.exports = {
  TicketSchema: mongoose.model('Ticket', TicketSchema),
};
