const response = require("../controllers/response");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const contact = async (ctx) => {
  const { email, name, message } = ctx.request.body;

  const html = `
    <p>A message was sent from the aroacedatabase.com contact page.</p> 
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>`;

  const msg = {
    to: "aroacedatabase@gmail.com", // Change to your recipient
    from: "senderaroacedb@gmail.com", // Change to your verified sender
    subject: "Message from aroacedatabase.com",
    text: "and easy to do anywhere, even with Node.js",
    html: `
    <p>A message was sent from the aroacedatabase.com contact page.</p> 
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response.body);
      return response(ctx, 401, {
        message: "error",
        error: error.response.body,
      });
    });

  response(ctx, 201, { message: "Email sent." });
};

module.exports = { contact };
