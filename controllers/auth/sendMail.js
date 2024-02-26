import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { PASSWORD } = process.env;

const nodemailerConfig = {
  service: 'gmail',
  auth: {
    user: 'dron24box@gmail.com',
    pass: 'reprrvuhakecnggf',
  },
};

const sendMail = async ({ to, subject, html }) => {
  const transport = nodemailer.createTransport(nodemailerConfig);
  const email = {
    to,
    from: 'dron24box@gmail.com',
    subject,
    html,
  };
  try {
    await transport.sendMail(email);
    console.log('Email Good');
  } catch (e) {
    console.log(e.message);
  }
};

export default sendMail;
