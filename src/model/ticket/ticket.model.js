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

const getTicketById = (_id, userId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ _id, userId })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const ReplyMessage = ({ ticketId, userId, message, sender }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id: ticketId, userId },
        {
          status: 'Otvoren',
          $push: {
            conversation: { message, sender },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const closeTicket = (_id, userId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id, userId },
        {
          status: 'Zatvoren',
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const deleteTicket = (_id, userId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndDelete({ _id, userId })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  insertTicket,
  getTickets,
  getTicketById,
  ReplyMessage,
  closeTicket,
  deleteTicket,
};
