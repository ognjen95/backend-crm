const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPinEmail = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await transporter.sendMail(info);

      console.log('Message sent: %s', result.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const emailProcessor = async (email, pin) => {
  const info = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: 'Password Reset PIN ✔', // Subject line
    text: `Here is Your PIN : ${pin}, this pin will expire in 1 day`, // plain text body
    html: `
        <b> Here is Your pin for password reset: ${pin}</b>
        <p>This pin will expire in 1 day</>  `, // html body
  };

  sendPinEmail(info);
};

module.exports = { emailProcessor };
