var nodemailer = require("nodemailer");
require("dotenv").config();

interface ImailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

export function sendMail(email: string, subject: string, textHtml: string) {
  var mailOptions: ImailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: textHtml,
  };
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendMail;
