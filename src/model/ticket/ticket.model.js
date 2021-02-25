const { TicketSchema } = require('./Ticket.schema');

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getTickets = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ userId })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = { insertTicket, getTickets };
