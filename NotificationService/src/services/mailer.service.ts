import { serverConfig } from '../config';
import { transporter } from '../config/mailer.config';
import logger from '../config/logger.config';
import { InternalServerError } from '../utils/errors/app.error';

export async function sendEmail(to: string, subject: string, body: string) {
  const mailOptions = {
    from: serverConfig.MAILER_EMAIL,
    to,
    subject,
    html: body,
  };
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to} successfully`);
  } catch (error) {
    logger.error(`Error sending email to ${to}`, error);
    throw new InternalServerError(`Error sending email to ${to}`);
  }
}
