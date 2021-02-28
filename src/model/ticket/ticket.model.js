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
// get send and recieved tickets for specific user
const getTicketsFromAllUsers = ({ _id, email }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ $or: [{ userId: _id }, { cc: email }] })
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

const getTicketById2 = (_id, user) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({
        $or: [
          { _id, userId: user._id },
          { _id, cc: user.email },
        ],
      })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const ReplyMessage = ({ ticketId, message, sender, user }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id: ticketId },
        {
          status: 'Otvoren',
          $push: {
            conversation: {
              message,
              sender,
              isOperater: user.userRole[0].operater,
            },
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

const closeTicket = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          status: 'Zatvoren',
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
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
  getTicketsFromAllUsers,
  getTicketById2,
};
