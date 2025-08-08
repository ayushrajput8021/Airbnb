import nodemailer from 'nodemailer';
import { serverConfig } from '.';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: serverConfig.MAILER_EMAIL,
    pass: serverConfig.MAILER_PASSWORD,
  },
});
